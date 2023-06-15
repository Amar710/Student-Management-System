package com.example.demo.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.models.Student;
import com.example.demo.models.StudentRepository;


import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepo;

    @GetMapping("/view")
    public String getAllStudents(Model model) {
        System.out.println("Getting all students");
        List<Student> students = studentRepo.findAll();
        model.addAttribute("students", students);
        return "students/showAll";
    }

 
    @GetMapping("/add")
    public String showAddStudentForm(Model model) {
        model.addAttribute("student", new Student());
        return "students/addStudent";
    }

    @PostMapping("/add")
        public String addStudent(@RequestParam("studentId") Long studentId, @RequestParam Map<String, String> newStudent, HttpServletResponse response, Model model) {
        System.out.println("Adding a student");
        String newName = newStudent.get("name");
        double newWeight = Double.parseDouble(newStudent.get("weight"));
        double newHeight = Double.parseDouble(newStudent.get("height"));
        String newHairColor = newStudent.get("hairColor");
        double newGpa = Double.parseDouble(newStudent.get("gpa"));
        Student student = new Student(studentId, newName, newWeight, newHeight, newHairColor, newGpa);
        studentRepo.save(student);
        model.addAttribute("student", student);
        return "redirect:/students/all";
    }

    @GetMapping("/all")
    public String showAllStudents(Model model) {
        List<Student> students = studentRepo.findAll();
        model.addAttribute("students", students);
        return "students/showAll";
    }

      
    @PostMapping("/delete")
    public String deleteStudent(@RequestParam("uid") Long uid, HttpServletResponse response) {
    studentRepo.deleteById(uid);
    response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    return "redirect:/students/all";
    }

    @GetMapping("/edit")
    public String editStudent(@RequestParam("uid") Long uid, Model model) {
        Optional<Student> optionalStudent = studentRepo.findById(uid);
        if (optionalStudent.isEmpty()) {
            // Handle error: Student not found
            return "redirect:/students/all";
        }
        Student student = optionalStudent.get();
        model.addAttribute("student", student);
        return "students/editStudent";
    }

    @PostMapping("/update")
    public String updateStudent(@ModelAttribute Student updatedStudent) {
    Optional<Student> optionalStudent = studentRepo.findById(updatedStudent.getUid());
    if (optionalStudent.isEmpty()) {
        // Handle error: Student not found
        return "redirect:/students/all";
    }
    
    Student existingStudent = optionalStudent.get();
    existingStudent.setId(updatedStudent.getId());
    existingStudent.setName(updatedStudent.getName());
    existingStudent.setWeight(updatedStudent.getWeight());
    existingStudent.setHeight(updatedStudent.getHeight());
    existingStudent.setHairColor(updatedStudent.getHairColor());
    existingStudent.setGpa(updatedStudent.getGpa());

    studentRepo.save(existingStudent);
    
    return "redirect:/students/all";
}

    
    



}


