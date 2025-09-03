import classNames from 'classnames';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={classNames('bg-white rounded-2xl shadow-sm border border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
}
