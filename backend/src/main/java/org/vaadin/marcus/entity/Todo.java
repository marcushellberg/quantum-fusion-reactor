package org.vaadin.marcus.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;

@Entity
public class Todo extends PanacheEntity {
    public boolean done;
    public String task;
}
