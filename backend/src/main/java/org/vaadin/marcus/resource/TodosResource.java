package org.vaadin.marcus.resource;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import io.quarkus.rest.data.panache.ResourceProperties;
import org.vaadin.marcus.entity.Todo;

@ResourceProperties(path = "/api/todos")
public interface TodosResource extends PanacheEntityResource<Todo, Long> {
}
