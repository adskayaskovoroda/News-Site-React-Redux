from django.conf import settings
from django.contrib.auth.signals import user_logged_in
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import jwt
from rest_framework_jwt.utils import jwt_payload_handler
from django.core.exceptions import ObjectDoesNotExist

from ..models import User


@api_view(['POST'])
@permission_classes([AllowAny])
def authenticate_user(request):

    try:
        email = request.data['email']
        password = request.data['password']

        user = User.objects.get(email=email, password=password)


        payload = jwt_payload_handler(user)
        token = jwt.encode(payload, settings.SECRET_KEY)
        user_details = {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'token': token,
        }
        user_logged_in.send(sender=user.__class__, request=request, user=user)
        return Response(user_details, status=status.HTTP_200_OK)

    except KeyError:
        res = {
            'error': 'Please, provide an email and a password'
        }
        return Response(res)

    except ObjectDoesNotExist:
        res = {
            'error': 'Can not authenticate with the given credentials or the account has been deactivated'
        }
        return Response(res, status=status.HTTP_403_FORBIDDEN)

    except:
        raise