from braintree.exceptions.authentication_error import AuthenticationError
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import braintree

@api_view(['GET'])
def generate_token(request):
    try:
        client_token = settings.BRAINTREE_GATEWAY.client_token.generate()
        return Response({'client_token': client_token}, status=status.HTTP_200_OK)
    except braintree.exceptions.AuthenticationError as e:
        error_message = f"Authentication Error"

        return Response({'error': error_message}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def process_payment(request):
    nonce = request.data.get('payment_method_nonce')
    amount = request.data.get('amount')

    if not nonce or not amount:
        return Response({'error': 'Datos incompletos'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        result = settings.BRAINTREE_GATEWAY.transaction.sale({
            "amount": amount,
            "payment_method_nonce": nonce,
            "options": {
                "submit_for_settlement": True
            }
        })

        if result.is_success:
            return Response({'message': 'Pago procesado correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': result.message}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

