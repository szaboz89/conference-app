package com.szabodev.conference.blog.repository;

import com.szabodev.conference.blog.domain.Blog;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Blog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {

}
