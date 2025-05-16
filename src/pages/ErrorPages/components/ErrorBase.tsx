import { Button } from 'antd';
import { m } from 'motion/react';
import { memo, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { MotionContainer } from '@/components/Animate';
import { varFade } from '@/components/Animate/variants/fade';
import SvgIcon from '@/components/SvgIcon';

interface ErrorBaseProps {
  title: string;
  errorBg: string;
}

const ErrorBase: FC<ErrorBaseProps> = ({ title, errorBg }) => {
  const { t } = useTranslation();

  // 云朵
  const cloud = [
    {
      id: 'cloud1',
      size: 80,
      top: ['17px', '33px', '81px', '97px'],
      left: ['220px', '188px', '92px', '60px'],
    },
    {
      id: 'cloud2',
      size: 46,
      top: ['10px', '40px', '130px', '160px'],
      left: ['420px', '360px', '180px', '120px'],
    },
    {
      id: 'cloud3',
      size: 62,
      top: ['100px', '120px', '180px', '200px'],
      left: ['500px', '460px', '340px', '300px'],
    },
  ];

  // 右侧内容
  const elements = useMemo(
    () => [
      {
        id: 'title',
        content: (
          <div className="mb-20 text-32 text-primary font-bold leading-40">
            {t(`system.${title}`)}
          </div>
        ),
      },
      {
        id: 'description',
        content: <div className="mb-30 text-13 text-gray leading-21">{t('system.checkUrl')}</div>,
      },
      {
        id: 'link',
        content: (
          <NavLink to="/">
            <Button type="primary">{t('system.goHome')}</Button>
          </NavLink>
        ),
      },
    ],
    [t]
  );

  return (
    <div className="box-border wh-full bg-layout px-50 py-20">
      <MotionContainer className="flex-center">
        <div className="relative w-600 overflow-hidden">
          <img className="w-full" src={errorBg} />
          {cloud.map((item) => (
            <m.div
              key={item.id}
              className="absolute"
              variants={
                varFade({
                  path: {
                    opacity: [0, 1, 1, 0],
                    top: item.top,
                    left: item.left,
                  },
                  durationIn: 2,
                }).inTopRight
              }
            >
              <SvgIcon localIcon="error_cloud" size={item.size} />
            </m.div>
          ))}
        </div>

        <div className="w-300 overflow-hidden py-30">
          {elements.map((item) => (
            <m.div key={item.id} variants={varFade().inUp}>
              {item.content}
            </m.div>
          ))}
        </div>
      </MotionContainer>
    </div>
  );
};

export default memo(ErrorBase);
