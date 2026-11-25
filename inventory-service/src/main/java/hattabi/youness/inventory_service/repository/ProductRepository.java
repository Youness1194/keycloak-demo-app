package hattabi.youness.inventory_service.repository;

import hattabi.youness.inventory_service.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {
}