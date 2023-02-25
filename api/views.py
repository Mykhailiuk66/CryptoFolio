from rest_framework.exceptions import ValidationError
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin
from rest_framework.generics import (GenericAPIView, ListAPIView, RetrieveAPIView,
                                     RetrieveUpdateDestroyAPIView, ListCreateAPIView,
                                     CreateAPIView)

from . import models
from . import serializers

from .cron import update_coins_info
from .util.misc import calculate_portfolio_snapshots

update_coins_info()
print('update_coins_info******************************************')

class ExchangeListAPIView(ListAPIView):
    queryset = models.Exchange.objects.all()
    serializer_class = serializers.ExchangeSerializer


class ExchangeRetrieveAPIView(RetrieveAPIView):
    queryset = models.Exchange.objects.all()
    serializer_class = serializers.ExchangeSerializer
    lookup_field = 'slug'


class CoinListAPIView(ListAPIView):
    queryset = models.Coin.objects.all()
    serializer_class = serializers.CoinSerializer


class CoinRetrieveAPIView(RetrieveAPIView):
    queryset = models.Coin.objects.all()
    serializer_class = serializers.CoinSerializer


class PortfolioRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = models.Portfolio.objects.all()
    serializer_class = serializers.PortfolioSerializer

    def retrieve(self, request, *args, **kwargs):
        calculate_portfolio_snapshots(self.get_object())
        return super().retrieve(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        return models.Portfolio.objects.filter(user=user)


class PortfolioListCreateAPIView(ListCreateAPIView):
    serializer_class = serializers.PortfolioSerializer

    def get_queryset(self):
        user = self.request.user
        return models.Portfolio.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PortfolioHoldingRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PortfolioHoldingSerializer

    def get_queryset(self):
        user = self.request.user
        return models.PortfolioHolding.objects.filter(portfolio__user=user)


class PortfolioHoldingCreateAPIView(CreateAPIView):
    queryset = models.PortfolioHolding.objects.all()
    serializer_class = serializers.PortfolioHoldingSerializer

    def perform_create(self, serializer):
        portfolio = self.request.data.get('portfolio')
        user = self.request.user
        portfolio = models.Portfolio.objects.filter(id=portfolio,
                                                    user=user).first()

        if not portfolio:
            raise ValidationError("Portfolio not found.")

        serializer.save(portfolio=portfolio)


class WatchlistUpdateDestroyAPIView(GenericAPIView,
                                    DestroyModelMixin,
                                    UpdateModelMixin):
    serializer_class = serializers.WatchlistSerializer

    def get_queryset(self):
        user = self.request.user
        return models.Watchlist.objects.filter(user=user)


class WatchlistListCreateAPIView(ListCreateAPIView):
    serializer_class = serializers.WatchlistSerializer

    def get_queryset(self):
        user = self.request.user
        return models.Watchlist.objects.filter(user=user)


class PortfolioHoldingsByPortfolioAPIView(ListAPIView):
    serializer_class = serializers.PortfolioHoldingSerializer

    def get_queryset(self):
        user = self.request.user
        portfolio_id = self.kwargs['pk']

        return models.PortfolioHolding.objects.filter(portfolio_id=portfolio_id, portfolio__user=user)


class PortfolioSnapshotListAPIView(ListAPIView):
    serializer_class = serializers.PortfolioSnapshotSerializer

    def get_queryset(self):
        user = self.request.user
        portfolio_id = self.kwargs['pk']

        return models.PortfolioSnapshot.objects.filter(portfolio_id=portfolio_id, portfolio__user=user)
