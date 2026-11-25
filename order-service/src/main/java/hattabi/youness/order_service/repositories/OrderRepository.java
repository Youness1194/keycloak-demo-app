package hattabi.youness.order_service.repositories;

import hattabi.youness.order_service.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {
}