from rest_framework import serializers

from . import models


class ExchangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Exchange
        fields = ['id', 'name', 'slug', 'logo']


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Coin
        fields = ['id', 'short_name', 'name', 'slug', 'icon']


class CoinExchangeInfoSerializer(serializers.ModelSerializer):
    turnover = serializers.FloatField(source='get_turnover')
    price_change = serializers.FloatField(
        source='get_price_change', read_only=True)
    price_change_perc = serializers.FloatField(
        source='get_price_change_perc', read_only=True)
    coin_short_name = serializers.CharField(
        source='coin.short_name', read_only=True)
    exchange_name = serializers.CharField(
        source='exchange.name', read_only=True)

    class Meta:
        model = models.CoinExchangeInfo
        fields = ['id', 'coin_short_name', 'exchange_name', 'date', 'price', 'volume', 'prev_price_24h',
                  'high_price', 'low_price', 'turnover', 'price_change',
                  'price_change_perc']


class PortfolioHoldingCreateSerializer(serializers.ModelSerializer):
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
        if value and value <= 0:
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


class PortfolioHoldingSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField(read_only=True)
    coin_short_name = serializers.CharField(
        source='coin.short_name', read_only=True)
    exchange_name = serializers.CharField(
        source='exchange.name', read_only=True)
    value = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.PortfolioHolding
        fields = ['id', 'portfolio', 'coin_short_name', 'exchange_name', 'quantity',
                  'purchase_price', 'purchase_date', 'sale_price', 'sale_date', 'value',
                  'price']

    def get_price(self, obj):
        coin_exchange_info = models.CoinExchangeInfo.objects.filter(
            coin=obj.coin, exchange=obj.exchange).order_by('-date').first()

        return None if coin_exchange_info is None else coin_exchange_info.price

    def get_value(self, obj):
        price = self.get_price(obj)
        if obj.sale_price:
            return obj.quantity * obj.sale_price
        elif price:
            return obj.quantity * price
        return obj.quantity * obj.purchase_price


class PortfolioSerializer(serializers.ModelSerializer):
    holdings = PortfolioHoldingSerializer(
        many=True, read_only=True)

    class Meta:
        model = models.Portfolio
        fields = ['id', 'name', 'notes', 'holdings']


class PortfolioSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PortfolioSnapshot
        fields = ['id', 'created', 'value']


class WatchlistCoinSerializer(serializers.ModelSerializer):
    coin = CoinSerializer(read_only=True)
    exchange = ExchangeSerializer(read_only=True)

    class Meta:
        model = models.WatchlistCoin
        fields = ['id', 'coin', 'exchange']


class CreateWatchlistCoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WatchlistCoin
        fields = ['watchlist', 'coin', 'exchange']


class SimplifiedWatchlistCoinSerializer(serializers.ModelSerializer):
    coin_slug = serializers.SlugRelatedField(
        source='coin', slug_field='slug', read_only=True)
    exchange_slug = serializers.SlugRelatedField(
        source='exchange', slug_field='slug', read_only=True)

    class Meta:
        model = models.WatchlistCoin
        fields = ['id', 'coin_slug', 'exchange_slug']


class WatchlistReadSerializer(serializers.ModelSerializer):
    coins = SimplifiedWatchlistCoinSerializer(
        many=True, read_only=True, source='watchlistcoins')

    class Meta:
        model = models.Watchlist
        fields = ['id', 'name', 'coins']


class WatchlistSerializer(serializers.ModelSerializer):
    coins = WatchlistCoinSerializer(
        many=True, read_only=True, source='watchlistcoins')

    class Meta:
        model = models.Watchlist
        fields = ['id', 'name', 'coins']
