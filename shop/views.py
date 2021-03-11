from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.db.models import Q
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import get_user_model

User = get_user_model()


def ProductFactory(product, request):
    data = []
    prod_seri = ProductSerializer(
        product, many=True, context={'request': request}).data
    for prod in prod_seri:
        prod['totalrating'] = Rating.objects.filter(product=prod['id']).count()
        prod['totalfavorit'] = Favorit.objects.filter(
            product=prod['id']).filter(isfavorit=True).count()
        p_view = ProductView.objects.filter(product=prod['id'])
        total_view = 0
        for p in p_view:
            total_view += p.view
        prod['view'] = total_view

        reviow_obj = Review.objects.filter(product=prod['id']).order_by('-id')
        reviow_serializer = ReviewSerializer(reviow_obj, many=True)
        prod['reviow'] = reviow_serializer.data

        data.append(prod)
    return data


class ProductsView(APIView):
    def get(self, request):
        catagory_obj = Category.objects.all()
        catagory_serializer = CategorySerializer(catagory_obj, many=True)
        allcatproducts = []
        for cata in catagory_serializer.data:
            cat_prod_obj = Product.objects.filter(category=cata['id'])
            cat_prod_seri = ProductFactory(cat_prod_obj, request)
            cata['products'] = cat_prod_seri
            allcatproducts.append(cata)
        return Response(allcatproducts)


class SingleProduct(APIView):
    def get(self, request, pk):
        try:
            product_obj = Product.objects.filter(id=pk)
            product_data = ProductFactory(product_obj, request)
            return Response(product_data)
        except:
            return Response({'error': "No Product For This ID"})


class CategoryProductsView(APIView):
    def post(self, request):
        cat_id = request.data['id']
        cat_obj = Category.objects.get(id=cat_id)
        cat_serializer = CategorySerializer(cat_obj).data
        product_obj = Product.objects.filter(category=cat_serializer['id'])
        cat_serializer['products'] = ProductFactory(product_obj, request)

        return Response(cat_serializer)


class BrandProductsView(APIView):
    def post(self, request):
        brand_id = request.data['id']
        brand_obj = Brand.objects.get(id=brand_id)
        brand_serializer = BrandSerializer(brand_obj).data
        product_obj = Product.objects.filter(brand=brand_serializer['id'])
        brand_serializer['products'] = ProductFactory(product_obj, request)

        return Response(brand_serializer)


class CategoryView(APIView):
    def get(self, request):
        category_obj = Category.objects.all()
        category_serializer = CategorySerializer(
            category_obj, many=True, context={'request': request})
        return Response(category_serializer.data)


class BrandView(APIView):
    def get(self, request):
        brand_obj = Brand.objects.all()
        brand_serializer = BrandSerializer(
            brand_obj, many=True, context={"request": request})
        return Response(brand_serializer.data)


class SliderView(APIView):
    def get(self, request):
        slider_obj = Slider.objects.all()
        slider_sreializer = SliderSerializer(
            slider_obj, many=True, context={'request': request})
        return Response(slider_sreializer.data)


class TrandingProductView(APIView):
    def get(self, request):
        tr_p = TrendingProduct.objects.all()
        tr_sr = TrandingProductSerializer(tr_p, many=True).data
        data = []
        for tr in tr_sr:
            prod_obj = Product.objects.filter(id=tr['products'])
            tr['products'] = ProductFactory(prod_obj, request)
            data.append(tr)
        return Response(data)


class MostViewsProducts(APIView):
    def get(self, request):
        p_obj = ProductView.objects.all().order_by('-view')[:12]
        pv_serializer = ProductViewSerializer(p_obj, many=True).data
        data = []
        for tr in pv_serializer:
            prod_obj = Product.objects.filter(id=tr['product'])
            tr['product'] = ProductFactory(prod_obj, request)
            data.append(tr)
        return Response(data)

# class ProductsForYou(APIView):
#     permission_classes = [IsAuthenticated, ]
#     authentication_classes = [TokenAuthentication, ]

#     def get(self, request, pk):
#         data = {}
#         ration = Rating.objects.filter(product=pk).first()
#         if ration:
#             data['rating'] = ration.stars
#         else:
#             data['rating'] = 0
#         favorit = Favorit.objects.filter(product=pk).filter(
#             customer=request.user.customer).first()
#         if favorit:
#             data['favorit'] = favorit.isfavorit
#         else:
#             data['favorit'] = False
#         return Response(data)


class SearchView(APIView):
    def get(self, request, q):
        data = {}
        posts_lookup = (Q(title__icontains=q) | Q(details__icontains=q) |
                        Q(tags__icontains=q) | Q(price__icontains=q))
        posts_obj = Product.objects.filter(
            time__lte=timezone.now()).filter(posts_lookup)
        # print(posts_obj)
        data['posts'] = ProductFactory(posts_obj, request)

        category_lookup = (Q(title__icontains=q) | Q(details__icontains=q))
        category_obj = Category.objects.filter(category_lookup)
        data['category'] = CategorySerializer(category_obj, many=True).data

        brand_lookup = (Q(title__icontains=q) | Q(details__icontains=q))
        brand_obj = Brand.objects.filter(category_lookup)
        data['brand'] = BrandSerializer(brand_obj, many=True, context={
                                        'request': request}).data
        return Response(data)


class SingleCategoryProducts(APIView):

    def get(self, request, pk):
        category_obj = Category.objects.get(id=pk)
        category_s = CategorySerializer(
            category_obj, context={'request': request}).data
        product_obj = Product.objects.filter(category=category_obj)
        category_s['product'] = ProductFactory(product_obj, request)

        return Response(category_s)


class SingleBrandProducts(APIView):
    def get(self, request, pk):
        brand_obj = Brand.objects.get(id=pk)
        brand_s = BrandSerializer(
            brand_obj, context={'request': request}).data
        product_obj = Product.objects.filter(brand=brand_obj)
        brand_s['product'] = ProductFactory(product_obj, request)

        return Response(brand_s)


class MyProfile(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request):
        customer_obj = Customer.objects.get(user=request.user)
        customer_ss = CustomerSerializer(
            customer_obj, context={'request': request}).data
        # print(request.user.password)
        return Response(customer_ss)


class UpdateCustomer(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            user = request.user
            customer_obj = Customer.objects.get(user=user)
            serializers = CustomerSerializer(
                customer_obj, data=request.data, context={'request': request})

            if serializers.is_valid(raise_exception=True):
                serializers.save()
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class ChangePassword(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        user = request.user
        serializer = UserPasswordSerializer(
            user, data=request.data, context={'request': request})

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user.set_password(serializer.data.get('password'))
            user.save()
            return Response({'error': False})
        return Response({'error': True})


class RegisterUserView(APIView):
    def post(self, request):
        serializers = UserSerializer(
            data=request.data,
        )
        email = request.data['email']
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response({'error': False, 'message': f"user Was crated for email {email}"})
        return Response({'error': True, 'message': "A user with that email already exists."})


class MyCart(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request):
        cart_obj = Cart.objects.filter(
            customer=request.user.customer).filter(complit=False).first()

        cart_serializer = CartSerializer(cart_obj).data
        cart_product_obj = CartProduct.objects.filter(
            cart=cart_serializer['id'])
        cart_product_serializer = CartProductSerializer(
            cart_product_obj, many=True, context={'request': request})
        cart_serializer['cartproducts'] = cart_product_serializer.data
        return Response(cart_serializer)


class OldCart(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request, pk=None):
        if pk:
            # print("pk===", pk)
            order_obj = Order.objects.filter(id=pk)

            order_serializer = OrderSerializer(order_obj, many=True).data
            data = []
            for order in order_serializer:
                cart_product_obj = CartProduct.objects.filter(
                    cart_id=order['cart']['id'])
                cart_product_serializer = CartProductSerializer(
                    cart_product_obj, many=True, context={'request': request})
                order['cartproducts'] = cart_product_serializer.data
                data.append(order)
            return Response(data)
        else:
            order_obj = Order.objects.filter(
                cart__customer=request.user.customer)

            order_serializer = OrderSerializer(order_obj, many=True).data
            data = []
            for order in order_serializer:
                cart_product_obj = CartProduct.objects.filter(
                    cart_id=order['cart']['id'])
                cart_product_serializer = CartProductSerializer(
                    cart_product_obj, many=True, context={'request': request})
                order['cartproducts'] = cart_product_serializer.data
                data.append(order)
            return Response(data)


class AddtoCartView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            product_obj = Product.objects.get(id=request.data['id'])
            cart_obj = Cart.objects.filter(
                customer=request.user.customer).filter(complit=False).first()
            if cart_obj:
                cart_product_obj = CartProduct.objects.filter(
                    product=product_obj)
                if cart_product_obj:
                    this_cart_product_on_cart = cart_product_obj.filter(
                        cart=cart_obj).first()
                    if this_cart_product_on_cart:
                        this_cart_product_on_cart.quantity += 1
                        this_cart_product_on_cart.total += (product_obj.price-(
                            product_obj.discount * 0.01 * product_obj.price))
                        cart_obj.total += (product_obj.price -
                                           (product_obj.discount * 0.01 * product_obj.price))
                        this_cart_product_on_cart.save()
                        cart_obj.save()
                else:
                    new_cart_product = CartProduct.objects.create(
                        total=(product_obj.price-(product_obj.discount *
                                                  0.01 * product_obj.price)),
                        quantity=1,
                        cart=cart_obj,
                    )
                    new_cart_product.product.add(product_obj)
                    cart_obj.total += (product_obj.price -
                                       (product_obj.discount * 0.01 * product_obj.price))
                    cart_obj.save()
            else:
                new_cart = Cart.objects.create(
                    customer=request.user.customer, total=0, complit=False)
                new_cart_product_new = CartProduct.objects.create(
                    total=(product_obj.price-(product_obj.discount *
                                              0.01 * product_obj.price)),
                    quantity=1,
                    cart=new_cart
                )
                new_cart_product_new.product.add(product_obj)
                new_cart.total += (product_obj.price -
                                   (product_obj.discount * 0.01 * product_obj.price))
                new_cart.save()

            response_mesage = {
                'error': False, 'message': "Product add to card successfully", "productid": request.data['id']}

        except:
            response_mesage = {'error': True,
                               'message': "Product Not add!Somthing is Wromg"}

        return Response(response_mesage)


class EditCartProduct(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):

        try:
            cp_obj = CartProduct.objects.get(id=request.data["cpid"])
            p_obj = Product.objects.get(id=request.data["pid"])
            cart_obj = cp_obj.cart

            cp_obj.quantity -= 1
            cp_obj.total -= (p_obj.price-(p_obj.discount*0.01*p_obj.price))
            cp_obj.save()

            cart_obj.total -= (p_obj.price-(p_obj.discount*0.01*p_obj.price))
            cart_obj.save()

            response_mesage = {
                'error': False, "message": "Single Product Removed", "productid": request.data['pid']}
        except:
            response_mesage = {'error': True}
        return Response(response_mesage)


class DelateCartProduct(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            cp_obj = CartProduct.objects.get(id=request.data["cpid"])
            p_obj = Product.objects.get(id=request.data["pid"])
            cart_obj = cp_obj.cart

            cart_obj.total -= cp_obj.total
            cart_obj.save()
            cp_obj.delete()

            response_mesage = {
                'error': False, "message": "Product Is Delated From Cart !", "productid": request.data['pid']}
        except:
            response_mesage = {'error': True}
        return Response(response_mesage)


class DelateCart(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            cart_obj = Cart.objects.get(id=request.data['id'])
            cart_obj.delete()
            response_mesage = {'error': False,
                               "message": "Full Cart is Delated"}
        except:
            response_mesage = {'error': True}
        return Response(response_mesage)


class OrderNow(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            # print(request.data)
            cart_obj = Cart.objects.get(id=request.data['cart'])
            order_serializer = OrderSerializer(data=request.data, context={
                'cart': request.data['cart']})
            if order_serializer.is_valid(raise_exception=True):
                order_serializer.save()
                cart_obj.complit = True
                cart_obj.save()
            response_mesage = {'error': False,
                               "message": "Your Order is Received!"}
        except:
            response_mesage = {'error': True}
        return Response(response_mesage)


class ViewProduct(APIView):
    def post(self, request):
        p_obj = Product.objects.get(id=request.data['pid'])
        p_view_obj = ProductView.objects.filter(product=p_obj).first()
        if p_view_obj:
            p_view_obj.view += 1
            p_view_obj.save()
        else:
            ProductView.objects.create(product=p_obj, view=1)
        return Response("ViewProduct Success")


class AddToFavoritView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            prod_id = request.data['pid']
            prod_obj = Product.objects.get(id=prod_id)
            user = request.user.customer
            fa_obj = Favorit.objects.filter(
                customer=user).filter(product=prod_obj).first()
            if fa_obj:
                old_fav = fa_obj.isfavorit
                fa_obj.like = not old_fav
                fa_obj.save()
            else:
                Favorit.objects.create(
                    product=prod_obj, customer=user, isfavorit=True,
                )
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class AddReview(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            user = request.user.customer
            p_obj = Product.objects.get(id=request.data['pid'])
            Review.objects.create(
                customer=user,
                product=p_obj,
                title=request.data['title']
            )
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class DelateOldOrder(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            order_obj = Order.objects.get(id=request.data['id'])
            cart_obj = Cart.objects.get(id=order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            responsemessage = {"error": False, "message": "Order delated"}
        except:
            responsemessage = {"error": True, "message": "Order Not Found"}
        return Response(responsemessage)
