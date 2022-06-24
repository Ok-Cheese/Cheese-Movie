import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { IContentList, IIdList } from 'types/type';
import { getContentItem } from 'utils/getContentItem';

interface IProps {
  id: number;
  index: number;
  idList: IIdList[];
  content: IContentList[];
  setContent: (data: IContentList[]) => void;
}

const IMG_URL = `https://image.tmdb.org/t/p/w300`;

const MovieItem = ({ id, index, idList, content, setContent }: IProps) => {
  const isDataStale = useMemo(() => {
    if (idList[index] === undefined || content[index] === undefined) return true;

    return idList[index].id !== content[index].id;
  }, [content, idList, index]);
  const getImageData = () => {
    return getContentItem(id);
  };

  const { data } = useQuery([`#img_${id}`, id], getImageData, {
    enabled: isDataStale,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    if (content[index] === undefined || data.id !== content[index].id) {
      const newContent = [...content];
      newContent[index] ? newContent.splice(index, 1, data) : newContent.push(data);
      setContent(newContent);
    }
  }, [content, data, index, setContent]);

  return (
    <li>
      <img src={`${IMG_URL}/${content[index]?.poster_path}`} alt={`movie_${data?.id}`} />
    </li>
  );
};

export default MovieItem;
