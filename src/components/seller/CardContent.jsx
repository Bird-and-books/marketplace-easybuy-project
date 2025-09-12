import classNames from 'classnames';

export function CardContent({ className, children, ...props }) {
  return (
    <div className={classNames('p-4', className)} {...props}>
      {children}
    </div>
  );
}
