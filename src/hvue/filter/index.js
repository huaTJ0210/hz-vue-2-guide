export function parseFilter(exp) {
  let filters = exp.split('|')
  let expression = filters.shift().trim()
  let i
  if (filters.length) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i].trim())
    }
  }
}

function wrapFilter(exp, filter) {
  const i = filter.indexOf('(')
  if (i < 0) {
    return `_f("${filter}")(${exp})`
  } else {
    const name = filter.slice(0, i)
    const args = filter.slice(i + 1)
    return `_f("${name}")(${exp},${args})`
  }
}

/*
  message | capitalize  =>  _f("captitalize")(message)

  message | filterA | filterB => _f("filterB")(_f("filterA")(message))

   message | filterA(arg1,arg2) => _f("filterA")(message,arg1,arg2)
*/
