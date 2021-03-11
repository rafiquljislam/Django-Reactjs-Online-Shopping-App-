from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from PIL import Image
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone

User = get_user_model()


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=True, null=True)
    mobile = models.CharField(max_length=15,  blank=True, null=True)
    Address = models.TextField(blank=True, null=True)
    username = models.CharField(
        max_length=150, unique=True, blank=True, null=True)

    def __str__(self):
        return self.user.email


@receiver(post_save, sender=Customer)
def customer_pre_save(sender, instance, created, *args, **kwargs):
    if created:
        instance.username = f'customer{instance.id}'
        instance.save()


@receiver(post_save, sender=User)
def create_customer(sender, instance, created, *args, **kwargs):
    if created:
        Customer.objects.create(user=instance)
        Token.objects.create(user=instance)


class Category(models.Model):
    title = models.CharField(max_length=150)
    image = models.ImageField(upload_to='category/', blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class Brand(models.Model):
    title = models.CharField(max_length=150)
    details = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to='brand/', blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=150)
    image = models.ImageField(upload_to='product/')
    oldprice = models.PositiveIntegerField(blank=True, null=True)
    price = models.PositiveIntegerField()
    discount = models.PositiveIntegerField(default=0)
    category = models.ManyToManyField(Category)
    brand = models.ForeignKey(
        Brand, on_delete=models.CASCADE, blank=True, null=True)
    details = models.TextField(blank=True, null=True)
    tags = models.TextField(blank=True, null=True)
    time = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}--{self.id}"

    def avg_rating(self):
        sum = 0
        ratings = Rating.objects.filter(product=self)
        for rating in ratings:
            sum += rating.stars

        if len(ratings) > 0:
            return sum / len(ratings)
        else:
            return 0


class Rating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    stars = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])


class Favorit(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    isfavorit = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.product}--{self.isfavorit}--{self.customer}"


class ProductView(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    view = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product.title}---{self.view}"


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    title = models.TextField()

    def __str__(self):
        return self.title


class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    complit = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.customer}---{self.complit}---{self.id}'


class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ManyToManyField(Product)
    quantity = models.PositiveIntegerField()
    total = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.cart}--{self.total}--{self.quantity}'


ORDER_STATUS = (
    ("Order Received", "Order Received"),
    ("Order Processing", "Order Processing"),
    ("On the way", "On the way"),
    ("Order Completed", "Order Completed"),
    ("Order Canceled", "Order Canceled"),
)


class Order(models.Model):
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    mobile = models.CharField(max_length=13)
    address = models.TextField()
    order_status = models.CharField(
        max_length=100, choices=ORDER_STATUS, default="Order Received")
    date = models.DateField(auto_now_add=True)
    email = models.CharField(max_length=200, blank=True, null=True)


class TrendingProduct(models.Model):
    products = models.ForeignKey(Product, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)


class Slider(models.Model):
    name = models.CharField(max_length=50, default="")
    details = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='slider_img')
    url = models.CharField(max_length=200, default="#")
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)
        if img.height > 1024 or img.width > 1024:
            output_size = (1024, 1024)
            img.thumbnail(output_size)
            img.save(self.image.path)
