import { useState } from 'react';

export function Calculator() {

  // 表示欄
  const [display, setDisplay] = useState('');

  // ボタン一覧
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+'
  ];

  // ボタンを押した時
  const handleClick = (btn) => {

    // クリア
    if (btn === 'C') {
      setDisplay('');
      return;
    }

    // 計算
    if (btn === '=') {
      try {
        setDisplay(String(calculate(display)));
      } catch {
        setDisplay('エラー');
      }
      return;
    }

    // 数字・演算子
    setDisplay(display + btn);
  };

  // 計算
  const calculate = (expression) => {

    // 「整数 演算子 整数」の形式のみ許可
    const validExpression = /^(\d+)([+\-*/])(\d+)$/;

    const match = expression.match(validExpression);

    if (!match) {
      throw new Error('無効な式');
    }

    const num1 = Number(match[1]);
    const operator = match[2];
    const num2 = Number(match[3]);

    switch (operator) {
      case '+':
        return num1 + num2;

      case '-':
        return num1 - num2;

      case '*':
        return num1 * num2;

      case '/':
        return num1 / num2;

      default:
        throw new Error('演算子エラー');
    }
  };

  return (
    <div className="calculator-container">
      <h2>電卓アプリ</h2>
      <div className="display">{display}</div>
      <div className="button-grid">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
}