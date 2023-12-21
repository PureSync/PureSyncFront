import React, { useState, useRef, forwardRef, useEffect } from 'react'
import dayjs from 'dayjs'
import useControllableState from '../hooks/useControllableState'
import useMergedRef from '../hooks/useMergeRef'
import Calendar from './CalendarUpdate'
import BasePicker from './BasePicker'
import { useConfig } from '../ConfigProvider'
import capitalize from '../utils/capitalize'

const DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD'

const DatePickerUpdate = forwardRef((props, ref) => {
    const {
        className,
        clearable,
        clearButton,
        closePickerOnChange,
        dateViewCount,
        dayClassName,
        dayStyle,
        defaultMonth,
        defaultOpen,
        defaultValue,
        defaultView,
        disabled,
        disableDate,
        enableHeaderLabel,
        disableOutOfMonth,
        firstDayOfWeek,
        hideOutOfMonthDates,
        hideWeekdays,
        inputFormat,
        inputPrefix,
        inputSuffix,
        inputtable,
        labelFormat,
        locale,
        maxDate,
        minDate,
        name,
        onBlur,
        onChange,
        onFocus,
        onDropdownClose,
        onDropdownOpen,
        openPickerOnClear,
        renderDay,
        size,
        style,
        type,
        value,
        weekendDays,
        yearLabelFormat,
        ...rest
    } = props

    const { locale: themeLocale } = useConfig()

    const finalLocale = locale || themeLocale

    const dateFormat =
        type === 'date'
            ? DEFAULT_INPUT_FORMAT
            : inputFormat || DEFAULT_INPUT_FORMAT

    const [dropdownOpened, setDropdownOpened] = useState(defaultOpen)

    const inputRef = useRef()

    const [lastValidValue, setLastValidValue] = useState(defaultValue ?? null)

    const [_value, setValue] = useControllableState({
        prop: value,
        defaultProp: defaultValue,
        onChange,
    })

    const [calendarMonth, setCalendarMonth] = useState(
        _value || defaultMonth || new Date()
    )

    const [focused, setFocused] = useState(false)

    const [inputState, setInputState] = useState(
        _value instanceof Date
            ? capitalize(dayjs(_value).locale(finalLocale).format(dateFormat))
            : ''
    )

    const closeDropdown = () => {
        setDropdownOpened(false)
        onDropdownClose?.()
    }

    const openDropdown = () => {
        setDropdownOpened(true)
        onDropdownOpen?.()
    }

    useEffect(() => {
        setValue(props.today);
        if (value === null && !focused) {
            setInputState();

        }

        if (value instanceof Date && !focused) {
            setInputState(
                capitalize(dayjs(value).locale(finalLocale).format(dateFormat))
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, focused, themeLocale])

    useEffect(() => {
        if (defaultValue instanceof Date && inputState && !focused) {
            setInputState(
                capitalize(dayjs(_value).locale(finalLocale).format(dateFormat))
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeLocale])


    //************* 날짜 세팅되는 부분  *********************/
    const handleValueChange = (date, form, field) => {
        if (date) {
            const formattedDate = dayjs(date).format('YYYY-MM-DD');
            setValue(date);
            setInputState(formattedDate);
            form.setFieldValue(field.name, formattedDate); 
        } else {
            form.setFieldError(field.name, '유효한 날짜를 선택해주세요.');
        }
        window.setTimeout(() => inputRef.current?.focus(), 0);
        closePickerOnChange && closeDropdown();
    };

    const handleClear = () => {
        setValue(null)
        setLastValidValue(null)
        setInputState('')
        openPickerOnClear && openDropdown()
        inputRef.current?.focus()
    }

    const parseDate = (date) => dayjs(date, dateFormat, finalLocale).toDate()

    const setDateFromInput = () => {
        let date = typeof _value === 'string' ? parseDate(_value) : _value

        if (maxDate && dayjs(date).isAfter(maxDate)) {
            date = maxDate
        }

        if (minDate && dayjs(date).isBefore(minDate)) {
            date = minDate
        }

        if (dayjs(date).isValid()) {
            setValue(date)
            setLastValidValue(date)
            setInputState(
                capitalize(dayjs(date).locale(finalLocale).format(dateFormat))
            )
            setCalendarMonth(date)
        } else {
            setValue(lastValidValue)
        }
    }

    const handleInputBlur = (event) => {
        typeof onBlur === 'function' && onBlur(event)
        setFocused(false)

        if (inputtable) {
            setDateFromInput()
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputtable) {
            closeDropdown()
            setDateFromInput()
        }
    }

    const handleInputFocus = (event) => {
        typeof onFocus === 'function' && onFocus(event)
        setFocused(true)
    }

    const handleChange = (event) => {
        const inputValue = event.target.value;
        // if(inputValue.length<11) return;
        if (inputValue.length > 10) {
            return;
        }

        let formattedInput = inputValue.replace(/[^\d]/g, ""); 
        if (formattedInput.length <= 4) {
        } else if (formattedInput.length <= 6) {
            formattedInput = `${formattedInput.slice(0, 4)}-${formattedInput.slice(4)}`;
        } else {
            formattedInput = `${formattedInput.slice(0, 4)}-${formattedInput.slice(4, 6)}-${formattedInput.slice(6)}`;
        }
        if (formattedInput.length > 8) {
            formattedInput = formattedInput.slice(0, 10);
        }
        setInputState(formattedInput); //
    
        if (formattedInput.length === 10 && /^\d{4}-\d{2}-\d{2}$/.test(formattedInput)) {
            if (dayjs(formattedInput, dateFormat, finalLocale).isValid()) {
                const date = dayjs(formattedInput, dateFormat, finalLocale).toDate();
                setValue(date);
                setLastValidValue(date);
                setCalendarMonth(date);
            }
        }
    };

    return (
        <BasePicker
            inputtable={inputtable}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
            ref={useMergedRef(ref, inputRef)}
            size={size}
            style={style}
            className={className}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            name={name}
            inputLabel={inputState}
            clearable={
                type === 'date' ? false : clearable && !!_value && !disabled
            }

            clearButton={clearButton}
            onClear={handleClear}
            disabled={disabled}
            onDropdownClose={onDropdownClose}
            onDropdownOpen={onDropdownOpen}
            type={type}
            inputPrefix={inputPrefix}
            inputSuffix={inputSuffix}
            {...rest}
        >
            <Calendar
                locale={finalLocale}
                month={inputtable ? calendarMonth : undefined}
                defaultMonth={
                    defaultMonth ||
                    (_value instanceof Date ? _value : new Date())
                }
                onMonthChange={setCalendarMonth}
                value={
                    _value instanceof Date
                        ? _value
                        : _value && dayjs(_value).toDate()
                }
                onChange={(date) => handleValueChange(date, props.form, props.field)}
                labelFormat={labelFormat}
                dayClassName={dayClassName}
                dayStyle={dayStyle}
                disableOutOfMonth={disableOutOfMonth}
                minDate={minDate}
                maxDate={maxDate}
                disableDate={disableDate}
                firstDayOfWeek={firstDayOfWeek}
                preventFocus={inputtable}
                dateViewCount={dateViewCount}
                enableHeaderLabel={enableHeaderLabel}
                defaultView={defaultView}
                hideOutOfMonthDates={hideOutOfMonthDates}
                hideWeekdays={hideWeekdays}
                renderDay={renderDay}
                weekendDays={weekendDays}
                yearLabelFormat={yearLabelFormat}
            />
        </BasePicker>
    )
})

DatePickerUpdate.defaultProps = {
    closePickerOnChange: true,
    labelFormat: {
        month: 'MMM',
        year: 'YYYY',
    },
    defaultOpen: false,
    name: 'date',
    clearable: true,
    disabled: false,
    firstDayOfWeek: 'monday',
    openPickerOnClear: false,
}

export default DatePickerUpdate;
