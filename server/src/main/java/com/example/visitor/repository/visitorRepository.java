package com.example.visitor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.visitor.entity.visitorEntity;

@Repository
public interface visitorRepository extends JpaRepository<visitorEntity, Integer> {
	
}
