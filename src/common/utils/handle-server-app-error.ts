import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types/common.types";

/**
 * Функция handleServerAppError представляет собой утилиту для обработки ошибок сервера в приложении на основе Redux.
 *
 * @template D - Обобщенный параметр типа, представляющий тип данных в BaseResponseType.
 * @param  {BaseResponseType<D>}️⃣ data - Данные ответа от сервера, обычно содержащие сообщения об ошибках.
 * @param {Dispatch} dispatch - Функция dispatch из Redux для обновления состояния приложения.
 * @param {boolean} isShowGlobalError - Флаг, указывающий, следует ли отображать глобальное сообщение об ошибке. По умолчанию true.
 * @returns {void} - void
 */
export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true,
): void => {
  if (isShowGlobalError) {
    const error = data.messages.length ? data.messages[0] : "Произошла ошибка";
    dispatch(appActions.setAppError({ error }));
  }

  dispatch(appActions.setAppStatus({ status: "failed" }));
};
