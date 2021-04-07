from basket.models import Basket


def basket_count(request):
    user = request.user

    if user.is_authenticated:
        counter_basket = Basket.objects.filter(user=user)
        counter_list = list(counter_basket)
        counter = sum(basket.quantity for basket in counter_list)
    else:
        counter = 0

    return {'basket_count': counter}
