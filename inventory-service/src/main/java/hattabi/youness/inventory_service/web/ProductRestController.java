package hattabi.youness.inventory_service.web;

import hattabi.youness.inventory_service.entities.Product;
import hattabi.youness.inventory_service.repository.ProductRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductRestController {

    private final ProductRepository productRepository;

    public ProductRestController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/products")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Product> productList() {
        return productRepository.findAll();
    }

    @GetMapping("/products/{id}")
    @PreAuthorize("hasAuthority('USER')")
    public Product productById(@PathVariable String id) {
        return productRepository.findById(id).orElseThrow();
    }

    @GetMapping("/auth")
    public Authentication authentication(Authentication authentication) {
        return authentication;
    }
}
