from django.test import TestCase
from django.test import TestCase
from .models import Estate, Item, User_Item, User_In_Estate
from django.core.exceptions import ObjectDoesNotExist


### Contains automated unit tests for Estate and Item, other Inter-Models such as User-Item
### and User-in-Estate are tested extensively with Postman. User model is django standard, does not
### require our testing.


#Automated unit testing for Estate model
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
            self.fail("Should not exist estate with name sandhaug") # "sandhaug" exists -> test fails
        except Estate.DoesNotExist:
            pass

        try:
            Estate.objects.get(id=3)
            self.fail("Estate with ID 3 should not exist") # estate with id = 3 -> test fails
        except Estate.DoesNotExist:
            pass


#Automated unit testing for Item model      
class ItemModelTestCase(TestCase):

    #Creates two estates "andersen" and "jonsen" and two items "sofa" and "lampe"
    #for testing purposes.
    @classmethod
    def setUpTestData(cls):
        Estate.objects.create(name="andersen", status=True)
        Estate.objects.create(name="jonsen", status=False)

        Item.objects.create(name="sofa", description="litt sliten men kul", image="default",
        estate_id = 3)
        Item.objects.create(name="lampe", description="ny og god", image="default",
        estate_id = 4)


    def test_item_attributes(self):
        sofa = Item.objects.get(name="sofa") #If raises error -> test fails
        lampe = Item.objects.get(name="lampe") #If raises error -> test fails

        self.assertEqual(sofa.id, 1)
        self.assertEqual(lampe.id, 2)

        self.assertEqual(sofa.estate_id, 3)
        self.assertEqual(lampe.estate_id, 4)


    def test_item_existence(self):
        try: 
            Item.objects.get(name="bord")
            self.fail("Should not exist item with name bord") # "bord" exists -> test fails.
        except Item.DoesNotExist:
            pass

        try:
            Item.objects.get(id=3)
            self.fail("Should not exist item with id 3") # item with id = 3 -> test fails.
        except Item.DoesNotExist:
            pass

