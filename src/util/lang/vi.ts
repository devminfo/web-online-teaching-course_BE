export const textFormat = (text: string) => `${text.slice(0, 12)}...`;

/* eslint max-len: 0 */
export const transNotification = {
  // add answerer
  addAnswerer: {
    title: 'Báo giá câu hỏi',
    summary: (question: any, username: string) => `${username} đã báo giá câu hỏi "${textFormat(question.content)}" `,
  },

  // recharge money
  rechargeMoney: {
    title: 'Nạp tiền thành công',
    summary: (money: Number) => `Bạn đã nạp +${money.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    })} vào ngày ${new Date().toISOString().split('T')[0]} thành công.  `,
  },

  // recharge money
  withdrawMoney: {
    title: 'Rút tiền thành công',
    summary: (money: Number) => `Bạn đã rút -${money.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    })} vào ngày ${new Date().toISOString().split('T')[0]} thành công.  `,
  },

  // Question payment
  questionPayment: {
    title: 'Thanh toán tiền câu hỏi',
    summary: (question: any) => `Thanh toán ${question.moneyTo} cho câu hỏi "${textFormat(
      question.content,
    )}"`,
  },

  // create question
  createQuestion: {
    title: 'Câu hỏi mới',
    content: 'Bạn  một đề xuất câu hỏi mới',
    summary: (specialize: string) => `Bạn có một đề xuất câu hỏi về lĩnh vực: ${specialize}`,
  },

  // completed answer question to author
  completedAnswerQuestion: {
    title: 'Hoàn thành câu hỏi',
    content: (question: any, balance: number) => `Bạn đã hoàn thành "${textFormat(
      question.content,
    )}". Bạn nhận được +${balance.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    })} vào tài khoản.`,
    summary: (question: any, balance: number) => `Bạn đã hoàn thành "${textFormat(
      question.content,
    )}". Bạn nhận được +${balance.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    })} vào tài khoản.`,
  },

  // complain to answerer
  complainToAnswerer: {
    title: 'Khiếu nại trả lời câu hỏi.',
    summary: (fullName: string, question: any) => `${fullName} đã khiếu nạn bạn với câu hỏi: "${textFormat(
      question.content,
    )}", chúng tôi sẽ kiểm tra giúp bạn và phản hồi bạn nhanh nhất. xin cảm ơn`,
    content: (fullName: string) => `Chúng tôi đã nhận được đơn khiếu nại từ ${fullName} về việc bạn trả lời câu hỏi.`,
  },

  // complain to author
  complainToAuthor: {
    title: (fullName: string) => `Khiếu nại từ ${fullName}`,
    summary: (fullName: string, question: any) => `${fullName} đã khiếu nạn bạn với câu hỏi: "${textFormat(
      question.content,
    )}", chúng tôi sẽ kiểm tra giúp bạn và phản hồi bạn nhanh nhất. xin cảm ơn`,
    content: (fullName: string) => `Chúng tôi đã nhận được đơn khiếu nại từ ${fullName} về việc bạn trả lời câu hỏi.`,
  },

  // confirm complain
  confirmComplain: {
    title: (fullName: string) => `Xác nhận Khiếu nại từ ${fullName}`,
    summary: (fullName: string, question: any) => `${fullName} đã khiếu nạn bạn với câu hỏi: "${textFormat(
      question.content,
    )}", chúng tôi sẽ kiểm tra giúp bạn và phản hồi bạn nhanh nhất. xin cảm ơn`,
    content: (fullName: string) => `Chúng tôi đã nhận được đơn khiếu nại từ ${fullName} về việc bạn trả lời câu hỏi.`,
  },

  // remove answerer
  removeAnswerer: {
    title: 'Hủy đấu giá câu hỏi của bạn.',
    content: 'Một nhà đấu giá đã hủy đấu giá câu hỏi của bạn.',
    summary: (user: any) => `${user.fullName} đã hủy đấu giá câu hỏi.`,
  },

  // select answerer success
  answererSelected: {
    title: 'Đấu giá của bạn đã được chọn',
    content:
      'Đấu giá của bạn đã được chọn, bạn có thể kiểm tra và thực hiện trả lời câu hỏi.',
    summary:
      'Đấu giá của bạn đã được chọn, bạn có thể kiểm tra và thực hiện trả lời câu hỏi.',
  },

  // answer unselect
  answererUnselect: {
    title: 'Đấu giá của bạn đã trượt',
    content: 'Câu hỏi đấu giá của bạn đã không được chọn.',
    summary: 'Câu hỏi đấu giá của bạn đã không được chọn.',
  },

  // cancel question
  cancelQuestion: {
    title: 'Câu hỏi đã hủy',
    content: 'Câu hỏi mà bạn tham gia đấu giá, người tạo đã hủy.',
    summary: 'Câu hỏi mà bạn tham gia đấu giá, người tạo đã hủy.',
  },

  // share video
  shareVideo: {
    title: 'Yêu cầu share video',
    content: (username: string, questionContent: string, money: number) => `${username} đã yêu cầu share video câu hỏi “${questionContent}”, với giá đề xuất là ${money.toLocaleString(
      'it-IT',
      {
        style: 'currency',
        currency: 'VND',
      },
    )}`,
    summary: (username: string, questionContent: string, money: number) => `${username} đã yêu cầu share video câu hỏi “${questionContent}”, với giá đề xuất là ${money.toLocaleString(
      'it-IT',
      {
        style: 'currency',
        currency: 'VND',
      },
    )}`,
  },

  sharedVideo: {
    title: 'Share video thành công',
    content: (username: string, questionContent: string, money: number) => `${username} đã chấp nhận share video câu hỏi “${questionContent}”, với giá đề xuất là ${money.toLocaleString(
      'it-IT',
      {
        style: 'currency',
        currency: 'VND',
      },
    )}`,
    summary: (username: string, questionContent: string, money: number) => `${username} đã chấp nhận share video câu hỏi “${questionContent}”, với giá đề xuất là ${money.toLocaleString(
      'it-IT',
      {
        style: 'currency',
        currency: 'VND',
      },
    )}`,
  },

  updateSharedVideo: {
    title: 'Cập nhập share video',
    content: (username: string, questionContent: string, money: number) => `${username} đã cập nhập share video câu hỏi “${questionContent}”, với giá là ${money.toLocaleString(
      'it-IT',
      {
        style: 'currency',
        currency: 'VND',
      },
    )}`,
    summary: (username: string, questionContent: string, money: number) => `${username} đã cập nhập share video câu hỏi “${questionContent}”, với giá là ${money.toLocaleString(
      'it-IT',
      {
        style: 'currency',
        currency: 'VND',
      },
    )}`,
  },

  // Denounce
  denounce: {
    title: 'Báo xấu',
    content: (user: any, question: any) => `Tài khoản ${user.fullName} đã báo xấu bạn trong câu hỏi “${textFormat(
      question.content,
    )}”`,
    summary: (user: any, question: any) => `Tài khoản ${user.fullName} đã báo xấu bạn trong câu hỏi “${textFormat(
      question.content,
    )}”`,
  },
};
