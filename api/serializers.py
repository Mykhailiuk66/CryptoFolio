from rest_framework import serializers

from . import models


class ExchangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Exchange
        fields = ['id', 'name', 'slug', 'logo']


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Coin
        fields = ['id', 'short_name', 'name', 'icon']


class PortfolioSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = models.Portfolio
        fields = ['id', 'username', 'name', 'notes']

    def get_username(self, obj):
        return str(obj.user.username)


class PortfolioHoldingSerializer(serializers.ModelSerializer):

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


class PortfolioSnapshotSerializer(serializers.ModelSerializer):
    portfolio_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.PortfolioSnapshot
        fields = ['id', 'portfolio_name', 'created', 'value']

    def get_portfolio_name(self, obj):
        return str(obj.portfolio.name)


class WatchlistListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Watchlist
        fields = ['id', 'name']


class WatchlistSerializer(serializers.ModelSerializer):
    coins = serializers.SerializerMethodField()

    class Meta:
        model = models.Watchlist
        fields = ['id', 'name', 'coins']

    def get_coins(self, obj):
        watchlist_coins = obj.watchlistcoins.all()
        coins = [watchlist_coin.coin for watchlist_coin in watchlist_coins]

        coin_data = CoinSerializer(coins, many=True)

        return coin_data.data


class CoinExchangeInfoSerializer(serializers.ModelSerializer):
    turnover = serializers.FloatField(source='get_turnover')
    price_change = serializers.FloatField(source='get_price_change', read_only=True)
    price_change_perc = serializers.FloatField(source='get_price_change_perc', read_only=True)

    class Meta:
        model = models.CoinExchangeInfo
        fields = ['date', 'price', 'volume', 'prev_price_24h',
                  'high_price', 'low_price', 'turnover', 'price_change',
                  'price_change_perc']


class CoinExchangeInfoExtendedSerializer(serializers.ModelSerializer):
    coin = CoinSerializer()
    exchange = ExchangeSerializer()
    turnover = serializers.FloatField(source='get_turnover', read_only=True)
    price_change = serializers.FloatField(source='get_price_change', read_only=True)
    price_change_perc = serializers.FloatField(source='get_price_change_perc', read_only=True)

    class Meta:
        model = models.CoinExchangeInfo
        fields = ['coin', 'exchange', 'date', 'price', 'volume', 'prev_price_24h',
                  'high_price', 'low_price', 'turnover', 'price_change',
                  'price_change_perc']
