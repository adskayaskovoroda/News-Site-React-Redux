from rest_framework import viewsets
from rest_framework.response import Response

from ..serializers import NewsSerializer
from ..models import News


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data, headers={
            'Access-Control-Allow-Origin': '*',
        })