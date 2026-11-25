package hattabi.youness.order_service.web;

import hattabi.youness.order_service.entities.Order;
import hattabi.youness.order_service.repositories.OrderRepository;
import hattabi.youness.order_service.restclients.InventoryRestClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrdersRestController {

    private final OrderRepository orderRepository;
    private final InventoryRestClient inventoryRestClient;

    public OrdersRestController(OrderRepository orderRepository, InventoryRestClient inventoryRestClient) {
        this.orderRepository = orderRepository;
        this.inventoryRestClient = inventoryRestClient;
    }

    @GetMapping("/orders")
    public List<Order> findAllOrders() {
        List<Order> orders = orderRepository.findAll();
        orders.forEach(o -> o.getProductItems()
                .forEach(pi -> pi.setProduct(inventoryRestClient.findProductById(pi.getProductId()))));
        return orders;
    }

    @GetMapping("/orders/{id}")
    public Order findOrderById(@PathVariable String id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.getProductItems().forEach(pi -> pi.setProduct(inventoryRestClient.findProductById(pi.getProductId())));
        return order;
    }
}
