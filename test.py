from itertools import product

def find_expression(target):
    numbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0']
    operators = ['+', '-', '']

    for ops in product(operators, repeat=len(numbers)-1):
        expression = numbers[0]
        for i in range(1, len(numbers)):
            expression += ops[i-1] + numbers[i]
        
        if eval(expression) == target:
            return expression
    
    return None

result = find_expression(200)
if result:
    print(f"Найдено выражение: {result} = 200")
else:
    print("Решение не найдено.")
