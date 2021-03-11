from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'email',)
        extra_kwargs = {'password': {"write_only": True, 'required': True}, }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'email',)
        read_only_fields = ['email']

    def validate(self, attrs):
        attrs['email'] = self.context['request'].user.email
        return attrs


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
        read_only_fields = ['user']

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id',
                  'title',
                  'image',
                  'oldprice',
                  'price',
                  'discount',
                  'category',
                  'brand',
                  'details',
                  'tags',
                  'time',
                  'avg_rating', ]
        depth = 1

    def imageurl(self, obj):
        request = self.context.get('request')
        return request.url(image)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

    def get_image(self, obj):
        request = self.context.get('request')
        return request.imageurl(image)


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"

    def logo(self, obj):
        request = self.context.get('request')
        return request.logourl(logo)


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = "__all__"
        depth = 1

    def getimageurl(self, obj):
        request = self.context.get('request')
        return request.url(image)


class TrandingProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingProduct
        fields = "__all__"


class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductView
        fields = ['product',
                  'customer',
                  'view',
                  'totalview', ]


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"


class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = "__all__"
        depth = 1

    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['product'] = ProductSerializer(
            instance.product,
            many=True,
            context={'request': request}
        ).data
        return response


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        depth = 1
        read_only_fields = ['cart']

    def validate(self, attrs):
        attrs['cart'] = Cart.objects.get(id=self.context.get('cart'))
        return attrs


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        depth = 1


class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductView
        fields = "__all__"
