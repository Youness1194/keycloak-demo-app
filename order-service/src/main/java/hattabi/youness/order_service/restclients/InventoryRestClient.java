package hattabi.youness.order_service.restclients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import hattabi.youness.order_service.model.Product;

import java.util.List;

@FeignClient(name = "inventory-service", url = "http://localhost:8087")
public interface InventoryRestClient {
    @GetMapping("/api/products")
    List<Product> getAllProducts();

    @GetMapping("/api/products/{id}")
    Product findProductById(@PathVariable("id") String id);
}
