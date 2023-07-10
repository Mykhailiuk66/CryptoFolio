from datetime import date
import uuid

from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()


class Exchange(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200,
                            null=False, blank=True)
    logo = models.ImageField(upload_to='exchanges/',
                             blank=True, null=True,
                             default='exchanges/default.png')

    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            unique_slug = base_slug
            suffix = 1
            while Exchange.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{base_slug}-{suffix}"
                suffix += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)


class Coin(models.Model):
    slug = models.SlugField(unique=True, max_length=30,
                            null=False, blank=True)
    short_name = models.CharField(max_length=20)
    name = models.CharField(max_length=100, null=True, blank=True)
    icon = models.ImageField(upload_to='coins/',
                             blank=True, null=True,
                             default='coins/default.png')

    class Meta:
        unique_together = ('name', 'short_name',)

    def __str__(self):
        return f"{self.short_name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.short_name)
            unique_slug = base_slug
            suffix = 1
            while Coin.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{base_slug}-{suffix}"
                suffix += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)


class CoinExchangeInfo(models.Model):
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)
    exchange = models.ForeignKey(Exchange, on_delete=models.CASCADE)
    date = models.DateField(default=date.today, blank=True)
    price = models.DecimalField(max_digits=40, decimal_places=20)

    turnover = models.DecimalField(
        max_digits=40, decimal_places=10, null=True, blank=True)
    volume = models.DecimalField(
        max_digits=40, decimal_places=10, null=True, blank=True)
    prev_price_24h = models.DecimalField(
        max_digits=40, decimal_places=20, null=True, blank=True)
    high_price = models.DecimalField(
        max_digits=40, decimal_places=20, null=True, blank=True)
    low_price = models.DecimalField(
        max_digits=40, decimal_places=20, null=True, blank=True)

    @property
    def get_price_change(self):
        if self.price and self.prev_price_24h:
            return self.price - self.prev_price_24h
        return None

    @property
    def get_price_change_perc(self):
        if self.prev_price_24h:
            return round((((self.price - self.prev_price_24h) / self.prev_price_24h) * 100), 3)
        return None

    class Meta:
        unique_together = ('coin', 'exchange', 'date')

    def __str__(self):
        return f"{self.coin.short_name} - {self.exchange.name} - {self.date}"


class Portfolio(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             null=True, blank=True)
    name = models.CharField(max_length=100)
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
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)
    exchange = models.ForeignKey(Exchange, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=40, decimal_places=20)

    purchase_price = models.DecimalField(max_digits=40, decimal_places=20)
    purchase_date = models.DateField(default=date.today, blank=True, null=True)
    sale_price = models.DecimalField(max_digits=40, decimal_places=20, blank=True,
                                     null=True)
    sale_date = models.DateField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.sale_price is not None and self.sale_date is None:
            raise ValueError("Sale date is mandatory when sale price is set.")
        if self.sale_date is not None and self.sale_price is None:
            raise ValueError("Sale price is mandatory when sale date is set.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.portfolio.name} - {self.coin.short_name} - {self.exchange.name}"


class PortfolioSnapshot(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE,
                                  related_name='snapshots')
    created = models.DateField(default=date.today, blank=True)
    value = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self):
        return f"{self.portfolio.name} - {str(self.created)}"


class Watchlist(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             null=True, blank=True)
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('user', 'name',)

    def __str__(self):
        return f"{self.user.username} - {self.name}"


class WatchlistCoin(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    watchlist = models.ForeignKey(
        Watchlist, on_delete=models.CASCADE, related_name="watchlistcoins")
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)
    exchange = models.ForeignKey(Exchange, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('watchlist', 'coin', "exchange")

    def __str__(self):
        return f"{self.watchlist.name} - {self.watchlist.user.username} - {self.coin.short_name} - {self.exchange.name}"
