from itertools import product

def find_expression(target):
    numbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0']
    operators = ['+', '-', '']
    valid_expressions = []  

    for ops in product(operators, repeat=len(numbers) - 1):
        expression = numbers[0]
        for i in range(1, len(numbers)):
            expression += ops[i - 1] + numbers[i]

        if eval(expression) == target:
            valid_expressions.append(expression)  

    return valid_expressions


result = find_expression(200)

if result:
    print(f"Найдено {len(result)} выражений, равных 200:")
    for expr in result:
        print(f"{expr} = 200")
else:
    print("Решение не найдено.")
