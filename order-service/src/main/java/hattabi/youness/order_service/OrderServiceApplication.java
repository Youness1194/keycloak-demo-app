package hattabi.youness.order_service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import hattabi.youness.order_service.entities.Order;
import hattabi.youness.order_service.entities.OrderState;
import hattabi.youness.order_service.entities.ProductItem;
import hattabi.youness.order_service.repositories.OrderRepository;
import hattabi.youness.order_service.repositories.ProductItemRepository;

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(OrderRepository orderRepository,
			ProductItemRepository productItemRepository) {
		return args -> {
			List<String> productIds = List.of("P01", "P02", "P03");
			Random random = new Random();
			for (int i = 0; i < 5; i++) {
				Order savedOrder = orderRepository.save(Order.builder()
						.id(UUID.randomUUID().toString())
						.date(LocalDate.now())
						.state(OrderState.PENDING)
						.build());
				productIds.forEach(pId -> productItemRepository.save(ProductItem.builder()
						.productId(pId)
						.quantity(random.nextInt(20) + 1)
						.price(Math.random() * 6000 + 100)
						.order(savedOrder)
						.build()));
			}
		};
	}
}
