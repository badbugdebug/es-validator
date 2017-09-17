/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 8.
 */

const MessageSource = (assert, name, properties) => {
  const nameText = name ? `${name}을(를) ` : '';
  switch (assert) {
    case '_json': return `${nameText}JSON 타입으로 입력하세요.`;
    case '_url': return `${nameText}URL 주소로 입력하세요.`;
    case '_email': return `${nameText}이메일 주소로 입력하세요.`;
    case '_ip': return `${nameText}아이피 주소로 입력하세요.`;
    case '_alpha': return `${nameText}알파벳으로 입력하세요.`;
    case '_alphaNumber': return `${nameText}알파벳과 숫자로 입력하세요.`;
    case '_date': return `${nameText}날짜 타입으로 입력하세요.`;
    case '_afterDate': return `${nameText}이후 날짜로 입력하세요.`;
    case '_beforeDate': return `${nameText}이전 날짜로 입력하세요.`;
    case '_hasText': return `${nameText}입력하세요.`;
    case '_equals': return `${nameText} ${properties.value}와 일치하지 않습니다.`;
    case '_check': return `${nameText}${properties.length}개 선택하세요.`;
    case '_rangeCheck': return `${nameText}${properties.min}개에서 ${properties.max}개로 선택하세요.`;
    case '_minCheck': return `${nameText}${properties.min}개 이하로 선택하세요.`;
    case '_maxCheck': return `${nameText}${properties.max}개 이상으로 선택하세요.`;
    case '_int': return `${nameText}숫자로 입력하세요.`;
    case '_rangeInt': return `${nameText} ${properties.min} 에서 ${properties.max} 숫자 사이로 입력하세요.`;
    case '_length': return `${nameText}${properties.min} 자 이상 ${properties.max} 자 이하로 입력하세요.`;
    case '_minLength': return `${nameText}${properties.min} 자이상으로 입력하세요.`;
    case '_maxLength': return `${nameText}${properties.max} 자이하로 입력하세요.`;
    case '_checked': return `${nameText}선택하세요.`;
    case '_selected': return `${nameText}선택하세요.`;
    default: return `${nameText}입력한 값은 유효하지 않습니다.`;
  }
};

export default MessageSource;
