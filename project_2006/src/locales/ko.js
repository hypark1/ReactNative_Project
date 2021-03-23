export default {
    login: {
        title: '로그인',
        sns: {
            naver: '네이버로 계속하기',
            kakao: '카카오톡으로 계속하기',
            google: '구글로 계속하기',
            apple: 'Apple로 계속하기',
            facebook: '페이스북으로 계속하기',
            hodoo: {
                title: '아이디로 계속하기',
                sub1: '홈페이지 > 마이페이지 > 학부모 정보',
                sub2: '에서',
                sub3: '간편로그인을 설정하시면 훨씬 간편하게\n로그인 하실 수 있습니다.'
            }
        },
        balloon: '기존 사용하시던 이메일 아이디로\n로그인 하실 수 있습니다.',
    },
    logOut: '로그아웃',
    signUp: '회원가입',
    splash: 'LOADING...',
    autoLogin: '자동 로그인',
    findId: '아이디 찾기',
    findPw: '비밀번호 재설정',
    placeholder: {
        id: '아이디(이메일)',
        pw: '비밀번호',
        dino: '50자까지',
        chunk: '200자까지',
        code: '이용권/체험권 번호',
        year: '년 선택',
        month: '월 선택'
    },
    alert: {
        title: '알림',
        ok: '확인',
        no: '취소',
        save: '저장',
        apply: '신청',
        logOut: '로그아웃하시겠어요?',
        exit: '한번 더 누르시면 종료됩니다.',
        update: '필수 업데이트가 있습니다. 업데이트 하시겠습니까?',
        login: '신규 가입은 홈페이지에서 가능합니다. 호두잉글리시 홈페이지로 이동합니다.',
        point: '포인트를 모두 적립 받으시겠어요?',
    },
    modal: {
        view: '자세히 보기',
        close: '닫기',
        '7days': '7일간 보지 않기'
    },
    validation: {
        id: {
            null: '아이디(이메일)를 입력하세요.',
            email: '이메일 형식에 맞게 입력하세요.'
        },
        pw: {
            null: '비밀번호를 입력하세요.'
        }
    },
    profile: {
        end: '최종 이용 종료일: {{day}}',
        next: '다음 결제 예정일: {{day}}',
        null: '학습자 계정이 없습니다.',
        none: '이용권/구독 내역 없음',
        picker: '학습자 선택'
    },
    menu: {
        chunk: '학습한 청크',
        report: '학습 리포트',
        mission: '학습 챌린지',
        coupon: '이용권 등록/사용',
        link: '추천링크/적립금',
        announce: '공지사항',
        review: '리얼후기',
        alarm: '맞춤 알림',
    },
    alarm: {
        title: '맞춤 알림',
        null: '알림 내역이 없습니다.'
    },
    dino: {
        title: '디노의 질문',
        inputNull: '답변을 작성해 주세요.',
        inputLength: '50자까지 입력해 주세요.',
        chkNull: '선택지를 선택해 주세요.',
        submit: '전송이 완료됐어요. 참여해 주셔서 감사합니다.'
    },
    chunk: {
        none: '학습한 청크 내역이 없습니다.',
        title: '청크 상세',
        record: '녹음한 음성 듣기',
        native: '원어민 음성 듣기',
        good: {
            title: '칭찬하기',
            null: '칭찬 메세지를 선택해 주세요.',
            text: '메세지를 입력해 주세요.',
            many: '200자까지 작성할 수 있어요.',
            done: '칭찬을 전달했어요. 학생이 게임 우편함에서 볼 수 있어요.',
            message: [
                '멋진 표현이다. 정말 대단한 걸!',
                '우리~ 시간 될 때, 같이 청크 대화 연습해볼까?',
                '날이 갈수록 실력이 느는구나!',
                '충분히 잘 하고 있다~ 늘 내가 응원하는 거 알지?',
                '발음, 억양 좋은걸? 원어민 같아!',
                '직접 입력'
            ]
        },
        share: {
            title: '공유하기',
        },
        story: '{{name}} 학생과 아래 대화로 연습해요.',
        point: {
            all: '모두 적립하기',
            now: '적립 포인트',
            chunk: '{{point}}P 받기',
        }
    },
    report: {
        conversation: '대화 학습',
        comprehension: '이해력 학습',
        none: '학습기록이 존재하지 않습니다.',
        total: {
            title: '전체 학습현황',
            total: '누적 ',
            oooo: '00시 00분',
            learning_days: '학습일',
            learning_days_text: '월 평균 {{day}}일 학습 (권장 20일)',
            learning_time: '학습 시간',
            learning_time_text: '일 평균 {{time}} (1일 1시간 권장)',
            learning_sentence: '학습 문장',
            learning_sentence_text: '1일 평균 69개',
            recent_continue_days: '현재 연속 출석',
            recent_continue_days_text: '최고 기록: ',
        },
        month: {
            title: '월별 학습현황',
            year: '년',
            month: '월'
        },
        chart: {
            title: '주요 학습 활동',
            talking: '대화학습',
            test: '테스트',
            word_sentence: '단어&문장 학습',
            talking_review: '대화 복습',
            etc: '기타 학습',
            none: '월별 학습 내역이 없습니다.'
        },
        day: '일',
        count: '개',
    },
    mission: {
        learner: '학습자',
        learnerNo: '학습자 정보가 없습니다.',
        going: {
            title: '진행 중인 챌린지',
            null1: '진행 중인 챌린지가 없습니다.',
            null2: '아래 버튼을 눌러 새로운 챌린지를 만들어보세요.',
            result: '하루에 "{{time}}분"씩 "{{date}}일"간 학습하기',
            reward: '자녀에게 우편함을 확인하라고 알려주세요.',
            cancel: {
                title: '취소하기',
                text: '시작한 미션은 취소하실 수 없습니다.',
                confirm: '챌린지를 취소하시겠어요?',
                ok: '챌린지가 취소되었습니다.',
                no: '챌린지가 이미 시작되어 취소하실 수 없습니다.',
            }
        },
        done: {
            title: '완료한 챌린지',
            null1: '완료한 챌린지가 없습니다.',
            null2: '아래 버튼을 눌러 새로운 챌린지를 만들어보세요.'
        },
        create: {
            title: '챌린지 만들기',
            time: '하루 학습 시간 설정하기',
            date: '학습 기간 선택하기',
            gift: '보상 선택하기',
            giftSub: '(앞으로 다양한 보상을 마련할 예정입니다.)',
            result1: '하루에 "{{time}}분"씩 "{{date}}일"간 학습하면',
            result2: '"{{gift}}"를 주겠습니다.',
            submit: '완료',
            alert: {
                no: '챌린지 만들기를 취소하시겠어요?',
                start: '이대로 챌린지를 시작하시겠어요?',
                done: '챌린지가 시작되었습니다!',
                coupon: '이용권이 등록되어 있지 않습니다. 이용권 등록 후 다시 이용해주세요.',
                pc: '학습 챌린지는 호두M 학습자에게만 설정할 수 있습니다.'
            }
        },
        time: '분',
        date: '일',
    },
    coupon: {
        date: '유효기간: {{date}}까지',
        null: '등록한 이용권 내역이 없습니다.',
        pc: '[호두PC] ',
        m: '[호두M] ',
        use: {
            title: '사용하기',
            popup: '이용권 적용',
            text: '이용권을 적용할 학습자를 선택하세요.',
            date: '이용 종료일: {{date}}',
            done: '이용권 사용을 완료했습니다.',
            null: '학습자를 선택하세요.',
            question: '이용권을 적용하겠습니까?',
            nonono: '이용권/구독 내역 없음',
            use: ' 이용중'
        },
        register: {
            title: '이용권 등록',
            null: '이용권/체험권 번호를 입력하세요.',
            overlap: '이미 등록된 이용권입니다.',
            number: '일련번호를 정확하게 입력해 주세요.',
            done: '이용권 등록을 완료했습니다.',
            none: '사용할 수 없는 이용권입니다.',
        },
    },
    link: {
        total: '총 누적 적립금',
        now: '현재 적립금',
        possible: '지급 가능 적립금',
        account: {
            title: '지급 계좌',
            modal: '지급 계좌 정보',
            bank: '입금 받을 은행',
            name: '예금주 성명',
            number: '계좌 번호',
            linkDate: '(유효기간: {{date}}까지)',
            button: {
                create: '등록',
                edit: '변경'
            },
            info: '안내사항',
            infoArr: [
                '계좌 정보가 정확하지 않을 경우, 지급이 보류되거나 취소될 수 있습니다.',
                '지급 신청된 경우, 지급이 처리된 후 계좌 정보를 변경할 수 있습니다.',
                '지급 신청이 보류되거나 취소될 경우, 다음 달에 재신청할 수 있습니다.',
            ],
            null: '모든 항목을 입력해 주세요.',
            done: '지급 계좌 정보가 저장되었습니다.',
            accountNumber: '계좌번호는 숫자만 입력해 주세요.',
            bankArr: [ '입금 받을 은행', '신한은행', '국민은행', '우리은행', '외환은행', '기업은행', '산업은행', '저축은행', '지역농축협은행', '경남은행', '광주은행', '대구은행', '한국씨티은행', '제주은행', '농협은행', 'KEB하나은행', '우체국은행', 'SC은행', '수협은행', '도이치은행', '신협은행', '새마을은행', '전북은행', '부산은행', '카카오뱅크']
        },
        won: '원',
        text: '추천 링크가 없습니다. 아래 “추천 링크 생성” 버튼을 눌러 나만의 링크를 생성해 보세요.',
        share: '친구에게 공유하기',
        point: {
            title: '적립금 지급 신청',
            done: '신청이 완료되었습니다.',
            error: '지급 가능 금액에 맞게 입력해 주세요.',
            null: '지급받을 금액을 입력해 주세요.',
            big: '1~{{point}}까지 입력할 수 있습니다.',
            up: '지급 신청된 내역이 있습니다. 지급 처리가 완료된 후 신청 가능합니다.',
            down: '지급 가능 적립금이 1만원 이상인 경우 적립금 신청이 가능합니다.',
            infoArr: [
                '지급 가능 적립금이 1만원 이상인 경우, 1만원 단위로 지급 신청할 수 있습니다.',
                '은행 계좌 정보가 정확하지 않을 경우, 입금 처리가 되지 않습니다.',
                '입금 진행 상황은 공식 홈페이지 > 추천링크 > 지급 내역에서 확인할 수 있습니다.',
                '5만원 이상인 경우, 기타 소득세 22%를 공제한 금액이 지급됩니다.',
                '신청일 기준 익월 말일에 지급됩니다. (단, 말일이 공휴일이면 전일 지급)',
            ],
            possible: '지급 가능 금액',
            manwon: '만원',
            placeholder: '만원 단위 입력'
        },
        create: {
            title: '추천 링크 생성',
            free: '유료 사용 중인 학습자가 있는 경우에만, 추천링크를 생성할 수 있습니다.',
            day: '생성한 링크가 아직 유효합니다. 만료일 5일 전부터 새로 생성할 수 있습니다.',
        },
    },
    announce: {
      type: {
          event: '이벤트',
          important: '중요',
          normal: '일반'
      }
    },
    review: {
        age: '({{age}}세)',
        writer: '작성자 | {{name}}',
        modalTitle: '리얼후기 상세'
    },
    share: {
        kakao: '카카오톡',
        instagram: '인스타그램',
        facebook: '페이스북',
        link: '주소 복사',
        chunkTitle: '학습한 청크 문장 "{{title}}" 을 공유합니다.',
        chunkBtn: '학습한 청크 상세보기',
        linkTitle: '아래 링크를 누르면 특별 할인(10%)을 받을 수 있습니다.',
        linkBtn: '친구추천 링크보기',
        copyText: '주소가 복사 되었습니다.'
    },
    error: '문의 바랍니다.'
};
