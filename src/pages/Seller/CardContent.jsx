import classNames from 'classnames';

const CardContent = () => {
  return (
    <div className={classNames('p-4', className)} {...props}>
      {children}
    </div>
  );
};

export default CardContent;
