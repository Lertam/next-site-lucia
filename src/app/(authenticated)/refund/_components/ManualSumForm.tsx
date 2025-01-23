"use client";
import { PaymentwayImage, PaymentwayNames } from "@/lib/utils/contants";
import { FastWay, PaymentGateways } from "@prisma/client";
import Image from "next/image";
import { FC, useState } from "react";
import Footer from "./Footer";
import FastWayBlock from "./FastWay";

const ManualSumForm: FC<{
  paymentSettings: Record<PaymentGateways, boolean>;
  fastWays: FastWay[];
}> = ({ paymentSettings, fastWays }) => {
  const [sum, setSum] = useState<number>(0);
  const [step, setStep] = useState<0 | 1>(0);

  const ways: Array<{ name: PaymentGateways; label: string }> = Object.keys(
    paymentSettings
  )
    .filter((key) => paymentSettings[key as PaymentGateways])
    .map((key) => ({
      name: key as PaymentGateways,
      label: PaymentwayNames[key as PaymentGateways],
    }));

  if (step === 0) {
    return (
      <div
        className={
          "relative bg-inherit w-fit mx-auto mt-4 flex flex-col items-center"
        }
      >
        <input
          type={"number"}
          placeholder={"Введите сумму"}
          className={
            "placeholder-transparent bg-transparent border-black border-opacity-30 text-center p-3 w-80"
          }
          value={sum}
          onChange={(ev) => {
            const val = Number(ev.target.value);
            if (isNaN(val)) return;
            setSum(val);
          }}
          id={"sum"}
        />
        <label
          htmlFor={"sum"}
          className={
            "absolute -top-2 left-28 text-center text-xs bg-background px-1 text-black text-opacity-60"
          }
        >
          Введите сумму
        </label>
        <span className={"text-xs text-center text-black text-opacity-60 mt-1"}>
          В российских рублях
        </span>
        <button
          className={
            "bg-foreground text-white uppercase w-full py-2 mt-4 rounded text-center disabled:bg-opacity-15 disabled:bg-black disabled:text-black disabled:text-opacity-25 w-fit"
          }
          disabled={sum === 0}
          onClick={() => setStep(1)}
        >
          Продолжить
        </button>
        <div className={"mt-10 grid gap-4 grid-cols-2"}>
          {fastWays.map((way) => (
            <FastWayBlock key={`fw-${way.id}`} {...way} />
          ))}
        </div>
        <div className={"mt-4"}>
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className={"text-center text-lg"}>Выберите способ пополнения</div>
        <form
          className={"mt-4"}
          onSubmit={(ev) => {
            ev.preventDefault();
            console.log(ev.target);
          }}
        >
          <input type={"hidden"} value={sum} name={"sum"} />
          <div className={`flex flex-wrap gap-4 justify-center items-center`}>
            {ways.map(({ name, label }) => (
              <button
                type={"submit"}
                name={"way"}
                value={name}
                key={`pg${name}`}
                className={"flex flex-col shadow-xl p-2 items-center"}
              >
                <div
                  className={
                    "w-[120px] h-[120px] flex flex-col justify-center items-center"
                  }
                >
                  <Image
                    src={`/images/payments/ways/${PaymentwayImage[name].base}`}
                    alt={label}
                    width={120}
                    height={120}
                  />
                </div>
                <span className={"font-bold"}>{label}</span>
              </button>
            ))}
          </div>
        </form>
        <div
          className={
            "text-gray-500 text-xs text-center flex flex-col gap-2 mt-10"
          }
        >
          <span>
            Оплатить заказ можно банковскими картами Visa, Master Card, «Мир»
            или через платежные системы Apple Pay, Яндекс.Деньги, QIWI или
            PayPal (последняя — только для покупателей из-за пределов Российской
            Федерации). Чтобы оплатить покупку, вы будете перенаправлены на
            сервер платежной системы Unitpay, на котором нужно ввести
            необходимые данные. При оплате банковской картой безопасность
            платежей гарантирует процессинговый центр Unitpay.
          </span>

          <span>
            Платежная система Unitpay обладает подтвержденным сертификатом
            соответствия требованиям стандарта PCI DSS 3.2.1 в части хранения,
            обработки и передачи данных держателей карт. Стандарт безопасности
            банковских карт PCI DSS поддерживается международными платежными
            системами, включая MasterCard и Visa, Inc. Система Unitpay также
            является участником программы непрерывного соответствия Compliance
            Control PCI DSS Compliance Process (P.D.C.P.). Ваши конфиденциальные
            данные, необходимые для оплаты (реквизиты карты, регистрационные
            данные и др.), не поступают в интернет-магазин — их обработка
            производится на стороне процессингового центра Unitpay и полностью
            защищена.
          </span>

          <span>
            Никто, в том числе наш интернет-магазин «obeliski.ru», не может
            получить данные вашей банковской карты или иные данные, необходимые
            для осуществления платежа.
          </span>
        </div>
        <Footer />
      </>
    );
  }
};

export default ManualSumForm;
