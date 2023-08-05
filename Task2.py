import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
screen_width = 800
screen_height = 600

# Colors
white = (255, 255, 255)
black = (0, 0, 0)

# Create the screen
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Circle Line Interaction")

# Clock for controlling frame rate
clock = pygame.time.Clock()

# Circle class
class Circle:
    def __init__(self, x, y, radius):
        self.x = x
        self.y = y
        self.radius = radius

# Create random circles
circles = []
num_circles = random.randint(5, 10)
for _ in range(num_circles):
    circle = Circle(random.randint(0, screen_width), random.randint(0, screen_height), 20)
    circles.append(circle)

# Main loop
running = True
drawing = False
line_points = []

while running:
    screen.fill(white)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            drawing = True
            line_points = [pygame.mouse.get_pos()]
        elif event.type == pygame.MOUSEMOTION:
            if drawing:
                line_points.append(pygame.mouse.get_pos())
        elif event.type == pygame.MOUSEBUTTONUP:
            drawing = False
            intersected_circles = []
            for circle in circles:
                for point in line_points:
                    if pygame.math.Vector2(circle.x, circle.y).distance_to(point) <= circle.radius:
                        intersected_circles.append(circle)
                        break
            for circle in intersected_circles:
                circles.remove(circle)
            line_points = []

    # Draw circles
    for circle in circles:
        pygame.draw.circle(screen, black, (circle.x, circle.y), circle.radius)

    # Draw line
    if len(line_points) > 1:
        pygame.draw.lines(screen, black, False, line_points)

    pygame.display.flip()
    clock.tick(60)

pygame.quit()