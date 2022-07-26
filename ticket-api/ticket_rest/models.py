from django.db import models


class ConcertVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    venue = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    date = models.DateTimeField()
    artist = models.CharField(max_length=100)
    concert_id = models.CharField(max_length=100)

    def __str__(self):
        return f"Venue: {self.venue}, Artist: {self.artist}, City: {self.city}"


class UserVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)

    def __str__(self):
        return str(self.email)


class Ticket(models.Model):
    price = models.DecimalField(max_digits=6, decimal_places=2)
    section = models.CharField(max_length=20)
    row = models.CharField(max_length=20)
    seat = models.CharField(max_length=20)
    sold = models.BooleanField(default=False)
    picture_url = models.URLField()
    concert = models.ForeignKey(ConcertVO,
        related_name="concert_tickets",
        on_delete=models.PROTECT)
    seller = models.ForeignKey(UserVO,
        related_name="seller_tickets",
        on_delete=models.PROTECT)
    buyer = models.ForeignKey(UserVO,
        related_name="buyer_tickets", null=True,
        on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.concert}, Sold by {self.seller} for ${self.price}"

class OrderItem(models.Model):
    user = models.ForeignKey(UserVO, on_delete=models.CASCADE, null=True)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    shipping_address = models.ForeignKey(
        'Address', related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)
    buyer_venmo = models.CharField(max_length=100, null=True)

    # def get_final_price(self):
    #     return self.ticket.price


# shopping cart
# have to add user model into this
# class Order(models.Model):
#     tickets = models.ManyToManyField(OrderItem)
#     # order_date = models.DateTimeField(auto_now_add=True, null=True)
#     shipping_address = models.ForeignKey(
#         'Address', related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)
#     billing_address = models.ForeignKey(
#         'Address', related_name='billing_address', on_delete=models.SET_NULL, blank=True, null=True)
#     buyer_venmo = models.CharField(max_length=100)


    # def get_total(self):
    #     total = 0
    #     for order_item in self.items.all():
    #         total += order_item.get_final_price()
    #     return total


class Address(models.Model):
    user = models.ForeignKey(UserVO, on_delete=models.CASCADE)
    street_address = models.CharField(max_length=100)
    apartment_address = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=2)
    zip = models.CharField(max_length=100)
