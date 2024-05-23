from datetime import date, timedelta
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from rest_framework.generics import (ListAPIView, UpdateAPIView,
                                     DestroyAPIView, RetrieveUpdateDestroyAPIView,
                                     ListCreateAPIView, CreateAPIView)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from . import models
from . import serializers

from .utils.misc import calculate_portfolio_snapshots


class ExchangeListAPIView(ListAPIView):
    queryset = models.Exchange.objects.all()
    serializer_class = serializers.ExchangeSerializer
    permission_classes = [AllowAny]


class CoinListAPIView(ListAPIView):
    queryset = models.Coin.objects.all()
    serializer_class = serializers.CoinSerializer
    permission_classes = [AllowAny]


class PortfolioUpdateDestroyAPIView(UpdateAPIView, DestroyAPIView):
    serializer_class = serializers.PortfolioSerializer

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
    # serializer_class = serializers.PortfolioHoldingSerializer

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return serializers.PortfolioHoldingCreateSerializer
        else:
            return serializers.PortfolioHoldingSerializer

    def get_queryset(self):
        user = self.request.user
        return models.PortfolioHolding.objects.filter(portfolio__user=user)


class PortfolioHoldingCreateAPIView(CreateAPIView):
    serializer_class = serializers.PortfolioHoldingCreateSerializer

    def get_queryset(self):
        user = self.request.user
        return models.PortfolioHolding.objects.filter(portfolio__user=user)

    def perform_create(self, serializer):
        portfolio = self.request.data.get('portfolio')
        user = self.request.user
        portfolio = models.Portfolio.objects.filter(id=portfolio,
                                                    user=user).first()

        if not portfolio:
            raise ValidationError("Portfolio not found.")

        serializer.save(portfolio=portfolio)


class WatchlistRetrievetUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.WatchlistReadSerializer

    def get_queryset(self):
        user = self.request.user
        return models.Watchlist.objects.filter(user=user)


class WatchlistListCreateAPIView(ListCreateAPIView):
    serializer_class = serializers.WatchlistSerializer

    def get_queryset(self):
        user = self.request.user
        return models.Watchlist.objects.filter(user=user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.WatchlistReadSerializer
        elif self.request.method == 'POST':
            return serializers.WatchlistSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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

        portfolio = get_object_or_404(models.Portfolio,
                                      id=portfolio_id,
                                      user=user)
        calculate_portfolio_snapshots(portfolio)

        return models.PortfolioSnapshot.objects.filter(portfolio=portfolio)


class CoinExchangeInfoAPIView(APIView):
    def get(self, request):
        coin_slugs = request.query_params.getlist('cs')
        exchange_slugs = request.query_params.getlist('es')

        if len(coin_slugs) != len(exchange_slugs):
            return Response({'error': 'Number of coin_slugs must match number of exchange_slugs'}, status=status.HTTP_400_BAD_REQUEST)

        coin_exchange_infos = []
        for coin_slug, exchange_slug in zip(coin_slugs, exchange_slugs):
            try:
                coin_exchange_info = models.CoinExchangeInfo.objects.filter(
                    coin__slug=coin_slug, exchange__slug=exchange_slug).order_by('-date').first()
                if coin_exchange_info:
                    coin_exchange_infos.append(coin_exchange_info)
            except models.CoinExchangeInfo.DoesNotExist:
                pass

        serializer = serializers.CoinExchangeInfoSerializer(
            coin_exchange_infos, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CoinExchangeHistoryAPIView(ListAPIView):
    serializer_class = serializers.CoinExchangeInfoSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        coin_slug = self.kwargs['coin_slug']
        exchange_slug = self.kwargs['exchange_slug']

        return models.CoinExchangeInfo.objects.filter(coin__slug__iexact=coin_slug, exchange__slug=exchange_slug).order_by("date")


class TrendingCoinsAPIView(ListAPIView):
    serializer_class = serializers.CoinExchangeInfoSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        max_objects = 12

        today = date.today()
        coin_exchange_infos = models.CoinExchangeInfo.objects.filter(
            date__gte=today).exclude(coin__short_name__icontains='usd').order_by('-date')
        if not coin_exchange_infos.exists():
            yesterday = date.today() - timedelta(days=1)
            coin_exchange_infos = models.CoinExchangeInfo.objects.filter(
                date__gte=yesterday).exclude(coin__short_name__icontains='usd').order_by('-date')

        coin_exchange_infos = sorted(coin_exchange_infos,
                                     key=lambda o: o.get_turnover if o.get_turnover else 0, reverse=True)[:max_objects]
        
        return coin_exchange_infos


class WatchlistCoinCreateAPIView(CreateAPIView):
    serializer_class = serializers.CreateWatchlistCoinSerializer

    def get_queryset(self):
        user = self.request.user
        return models.WatchlistCoin.objects.filter(watchlist__user=user)


class WatchlistCoinDestroyAPIView(DestroyAPIView):
    serializer_class = serializers.WatchlistCoinSerializer

    def get_queryset(self):
        user = self.request.user
        return models.WatchlistCoin.objects.filter(watchlist__user=user)
