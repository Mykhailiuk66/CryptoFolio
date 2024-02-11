from django.shortcuts import render

from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin
from rest_framework.generics import (GenericAPIView, ListAPIView, RetrieveAPIView,
                                     RetrieveUpdateDestroyAPIView, ListCreateAPIView)

from . import models
from . import serializers


class ExchangeListAPIView(ListAPIView):
    queryset = models.Exchange.objects.all()
    serializer_class = serializers.ExchangeSerializer


class ExchangeRetrieveAPIView(RetrieveAPIView):
    queryset = models.Exchange.objects.all()
    serializer_class = serializers.ExchangeSerializer


class CoinListAPIView(ListAPIView):
    queryset = models.Coin.objects.all()
    serializer_class = serializers.CoinSerializer


class CoinRetrieveAPIView(RetrieveAPIView):
    queryset = models.Coin.objects.all()
    serializer_class = serializers.CoinSerializer


class PortfolioRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = models.Portfolio.objects.all()
    serializer_class = serializers.PortfolioSerializer


class PortfolioListCreateAPIView(ListCreateAPIView):
    queryset = models.Portfolio.objects.all()
    serializer_class = serializers.PortfolioSerializer


class PortfolioHoldingRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = models.PortfolioHolding.objects.all()
    serializer_class = serializers.PortfolioHoldingSerializer


class PortfolioHoldingListCreateAPIView(ListCreateAPIView):
    queryset = models.PortfolioHolding.objects.all()
    serializer_class = serializers.PortfolioHoldingSerializer


class PortfolioSnapshotgRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = models.PortfolioSnapshot.objects.all()
    serializer_class = serializers.PortfolioSnapshotSerializer


class PortfolioSnapshotListCreateAPIView(ListCreateAPIView):
    queryset = models.PortfolioSnapshot.objects.all()
    serializer_class = serializers.PortfolioSnapshotSerializer


class WatchlistUpdateDestroyAPIView(GenericAPIView,
                                    DestroyModelMixin,
                                    UpdateModelMixin):
    queryset = models.Watchlist.objects.all()
    serializer_class = serializers.WatchlistSerializer


class WatchlistListCreateAPIView(ListCreateAPIView):
    queryset = models.Watchlist.objects.all()
    serializer_class = serializers.WatchlistSerializer


class PortfolioHoldingsByPortfolioAPIView(ListAPIView):
    serializer_class = serializers.PortfolioHoldingSerializer

    def get_queryset(self):
        portfolio_id = self.kwargs['pk']
        return models.PortfolioHolding.objects.filter(portfolio_id=portfolio_id)


class PortfolioSnapshotListAPIView(ListAPIView):
    serializer_class = serializers.PortfolioSnapshotSerializer

    def get_queryset(self):
        portfolio_id = self.kwargs['pk']
        return models.PortfolioSnapshot.objects.filter(portfolio_id=portfolio_id)
