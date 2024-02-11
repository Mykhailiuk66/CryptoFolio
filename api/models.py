from datetime import date
import uuid

from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Exchange(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='exchanges/',
                             blank=True, null=True,
                             default='exchanges/default.png')

    def __str__(self):
        return str(self.name)


class Coin(models.Model):
    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=20)
    logo = models.ImageField(upload_to='coins/',
                             blank=True, null=True,
                             default='coins/default.png')

    class Meta:
        unique_together = ('name', 'short_name',)

    def __str__(self):
        return f"{self.short_name} - {self.name}"


class Portfolio(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             null=True, blank=True)
    name = models.CharField(max_length=300)
    notes = models.TextField(blank=True, null=True, max_length=500)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'name',)

    def __str__(self):
        return f"{self.user.username} - {self.name}"


class PortfolioHolding(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE,
                                  related_name='holdings')
    coin = models.ForeignKey(Coin, on_delete=models.RESTRICT)
    exchange = models.ForeignKey(Exchange, on_delete=models.SET_NULL,
                                 default=None, null=True, blank=True)
    quantity = models.DecimalField(max_digits=20, decimal_places=2)

    purchase_price = models.DecimalField(max_digits=40, decimal_places=20)
    purchase_date = models.DateField(default=date.today, blank=True, null=True)
    sale_price = models.DecimalField(max_digits=40, decimal_places=20, blank=True,
                                     null=True)
    sale_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.portfolio.name} - {self.coin.name} - {self.exchange.name}"


class PortfolioSnapshot(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE,
                                  related_name='snapshots')
    created = models.DateField(auto_now_add=True)
    value = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self):
        return f"{self.portfolio.name} - {str(self.created)}"


class Watchlist(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             null=True, blank=True)
    coins = models.ManyToManyField(Coin)

    def __str__(self):
        return str(self.user.username)
