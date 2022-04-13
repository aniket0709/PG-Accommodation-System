package com.app.homerental.service;

import com.app.homerental.model.userModel.User;
import com.app.homerental.model.userModel.UserDto;
import com.app.homerental.model.userModel.UserPostDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);
    User findById(Long id);
    UserDto findDtoById(Long id);
    List<UserDto> findAll();

    UserDto approve(Long id);

    UserDto save(UserPostDto userPostDto);
    void deleteById(Long id);
    UserPostDto findFullDtoById(Long id);
}
