from django.test import TestCase

# Create your tests here.

# Create your tests here.

from django.test import TestCase
from .models import Estate, Item, User_Item, User_In_Estate
from django.core.exceptions import ObjectDoesNotExist

class EstateModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        Estate.objects.create(name="andersen", status=True)
        Estate.objects.create(name="jonsen", status=False)

    def test_estate_attributes(self):
        andersen = Estate.objects.get(name="andersen") #If raises error -> test failed
        jonsen = Estate.objects.get(name="jonsen") #If raises error -> test failed

        self.assertEqual(andersen.id, 1)
        self.assertEqual(jonsen.id, 2)

        self.assertEqual(andersen.status, True)
        self.assertEqual(jonsen.status, False)

    def test_estate_existence(self):
        try: 
            Estate.objects.get(name="sandhaug")
            self.fail("Should not exist estate with name sandhaug")
        except Estate.DoesNotExist:
            pass

        try:
            Estate.objects.get(id=3)
            self.fail("Estate with ID 3 should not exist")
        except Estate.DoesNotExist:
            pass

        
class ItemModelTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        Estate.objects.create(name="andersen", status=True)
        Estate.objects.create(name="jonsen", status=False)

        Item.objects.create(name="sofa", description="litt sliten men kul", image="default",
        estate_id = 3)
        Item.objects.create(name="lampe", description="ny og god", image="default",
        estate_id = 4)

    def test_item_attributes(self):
        sofa = Item.objects.get(name="sofa")
        lampe = Item.objects.get(name="lampe")

        self.assertEqual(sofa.id, 1)
        self.assertEqual(lampe.id, 2)

        self.assertEqual(sofa.estate_id, 3)
        self.assertEqual(lampe.estate_id, 4)

    def test_item_existence(self):
        try: 
            Item.objects.get(name="bord")
            self.fail("Should not exist item with name bord")
        except Item.DoesNotExist:
            pass

        try:
            Item.objects.get(id=3)
            self.fail("Should not exist item with id 3")
        except Item.DoesNotExist:
            pass

