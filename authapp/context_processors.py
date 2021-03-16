

def user_status(request):
    user = request.user
    if user.is_authenticated:
        status = 'авторизован'
    else:
        status = 'не авторизован'

    return {'status': status}

