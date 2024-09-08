from django.db import models
from products.models import Product
from user.models import User

class Cart(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart")
    subtotal=models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    count=models.IntegerField()

    def __str__(self):
        return "cart the: " + self.user.email + " (" +  str(self.id) + ")"

class CartItem(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart_items")
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity=models.IntegerField()
