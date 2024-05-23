from rest_framework.test import APITestCase
from rest_framework import status
from api.models import Coin

class CoinModelAPITest(APITestCase):
    def setUp(self):
        Coin.objects.create(short_name='BTC', name='Bitcoin')

    def test_get_my_model_list(self):
        url = '/api/coins/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

