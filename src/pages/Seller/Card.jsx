import classNames from 'classnames';

const Card = () => {
  return (
    <div
      className={classNames('bg-white rounded-2xl shadow-sm border border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
