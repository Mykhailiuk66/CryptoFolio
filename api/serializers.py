from rest_framework import serializers

from . import models


class ExchangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Exchange
        fields = ['id', 'name', 'logo']


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Coin
        fields = ['id', 'name', 'short_name', 'logo']


class PortfolioHoldingSerializer(serializers.ModelSerializer):
    coin = CoinSerializer(read_only=True)
    exchange = ExchangeSerializer(read_only=True)

    class Meta:
        model = models.PortfolioHolding
        fields = ['id', 'portfolio', 'coin', 'exchange', 'quantity',
                  'purchase_price', 'purchase_date', 'sale_price', 'sale_date']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than zero.")
        return value

    def validate_purchase_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Purchase price must be greater than zero.")
        return value

    def validate_sale_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Sale price must be greater than zero.")
        return value

    def validate(self, data):
        purchase_date = data.get('purchase_date')
        sale_date = data.get('sale_date')

        if sale_date and purchase_date and sale_date < purchase_date:
            raise serializers.ValidationError(
                "Sale date cannot be before purchase date.")

        return data


class PortfolioSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = models.Portfolio
        fields = ['id', 'username', 'name', 'notes']

    def get_username(self, obj):
        return str(obj.user.username)


class PortfolioSnapshotSerializer(serializers.ModelSerializer):
    portfolio_name = serializers.SerializerMethodField()

    class Meta:
        model = models.PortfolioSnapshot
        fields = ['id', 'portfolio_name', 'created', 'value']

    def get_portfolio_name(self, obj):
        return str(obj.portfolio.name)


class WatchlistSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    coins = CoinSerializer(many=True, read_only=True)

    class Meta:
        model = models.Watchlist
        fields = ['id', 'username', 'coins']

    def get_username(self, obj):
        return str(obj.user.username)
