from django.contrib import admin

from mainapp.models import ProductCategory, Product

# admin.site.register(Product)
admin.site.register(ProductCategory)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity')
    fields = ('name', 'image', 'description', 'short_description', ('price', 'quantity'), 'category')
    readonly_fields = ('name',)
    # ordering = ('name',) #от А до Я
    ordering = ('-price',) # от большего к меньшему
    search_fields = ('name', 'category__name',)


