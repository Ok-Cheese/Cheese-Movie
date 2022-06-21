import axios from 'axios';
import dayjs from 'dayjs';

interface IBoxOfficeData {
  audiChange: string;
  audiCnt: string;
  audiInten: string;
  movieCd: string;
  movieNm: string;
  openDt: string;
  rank: string;
  rankInten: string;
  rankOldAndNew: string;
  rnum: string;
  salesAcc: string;
  salesAmt: string;
  salesChange: string;
  salesInten: string;
  salesShare: string;
  scrnCnt: string;
  showCnt: string;
}

const URL = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';

const today = dayjs().subtract(1, 'd').format('YYYYMMDD');

export const getBoxOffice = () => {
  return axios({
    url: URL,
    params: {
      key: process.env.REACT_APP_BOX_OFFICE_KEY,
      targetDt: today,
    },
  }).then((res) => {
    const list: IBoxOfficeData[] = res.data.boxOfficeResult.dailyBoxOfficeList;
    const result = list.map((el) => {
      return { title: el.movieNm, audience: el.audiChange };
    });

    console.log('load');

    return result;
  });
};
